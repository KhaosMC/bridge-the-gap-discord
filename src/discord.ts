import { Client, GatewayIntentBits } from 'discord.js';
import type { options } from './config';

let client: Client | null = null;

export async function getClient(opts: typeof options): Promise<Client> {
	if (client) {
		return client;
	}
	const clientOptions = {
		intents: [GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages],
	};

	client = new Client(clientOptions);
	await client.login(opts.discordToken);
	return client;
}
