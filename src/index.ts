import type { BaseGuildTextChannel } from 'discord.js';
import { options } from './config';
import { getClient } from './discord';

const client = getClient(options);

const server = await client.guilds.fetch(options.serverId);
const channel = (await server.channels.fetch(options.channelId)) as BaseGuildTextChannel;

client.on('messageCreate', (msg) => {
	console.log(msg.content);
});

client.on('ready', () => {
	if (!channel) {
		throw new Error('Cannot find the discord channel, please re-check your channel & server id.');
	}

	console.log('ChatBridge is now up and running!');
	console.log('Listening on:', `#${channel.name}`);
	channel.send('Hello World!');
});
