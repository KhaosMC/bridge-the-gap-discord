import { z } from 'zod';
import { generateErrorMessage } from 'zod-error';

const optionsSchema = z.object({
    discordToken: z.string().max(128).refine((arg) => arg !== "discord token"),
    channelId: z.string().min(16).max(24),
    serverId: z.string().min(16).max(24),
    btgToken: z.string().max(128).refine((arg) => arg !== "bridge the gap token"),
    btgUrl: z.string().url().startsWith('ws'),
})

const inputOptions = {
    discordToken: Bun.env.DISCORD_TOKEN,
    channelId: Bun.env.CHANNEL_ID,
    serverId: Bun.env.SERVER_ID,
    btgToken: Bun.env.BTG_TOKEN,
    btgUrl: Bun.env.BTG_URL,
}

const parsedOptions = optionsSchema.safeParse(inputOptions);

if (!parsedOptions.success) {
    throw new Error(generateErrorMessage(parsedOptions.error.issues));
}

export const options = parsedOptions.data;