import {
  CommandInteraction,
  GatewayIntentBits,
  InteractionResponse,
  Message,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
} from 'discord.js';

export interface Config {
  id: string;
  intents: GatewayIntentBits[];
  name: string;
  token: string;
}

export interface SlashCommand {
  data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
  execute: (interaction: CommandInteraction) => Promise<InteractionResponse | Message>;
}

export type SlashCommands = Record<string, SlashCommand>;

export type MsgFn = (message: string) => string;

type MsgOption = {
  fmt: MsgFn;
  weight: number;
};

export type MsgFmtOptions = (MsgFn | MsgOption)[];
