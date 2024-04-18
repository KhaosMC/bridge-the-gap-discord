import { Client, GatewayIntentBits } from 'discord.js';
import type { options } from './config';

let client: Client | null = null;

export function getClient(opts: typeof options): Client {
    if (client) {
        return client;
    }
    const clientOptions = {
        intents: [
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMessages,
        ]
    }
    
    client = new Client(clientOptions);
    client.login(opts.discordToken);
    return client;
}