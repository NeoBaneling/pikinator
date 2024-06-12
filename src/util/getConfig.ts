import { GatewayIntentBits } from 'discord.js';
import { Config } from '../common/types';
import dotenv from 'dotenv';

export const getConfig = (name: string): Config => {
  dotenv.config({ path: ['.env.local', '.env'] });

  const id = process.env[`${name.toUpperCase()}_CLIENT_ID`];
  const token = process.env[`${name.toUpperCase()}_TOKEN`];

  if (!id || !token) {
    throw new Error(`[${name}] Missing environment variables`);
  }

  return {
    id,
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
    name,
    token,
  };
};
