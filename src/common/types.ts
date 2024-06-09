import { CommandInteraction, GatewayIntentBits, InteractionResponse, Message, SlashCommandBuilder, SlashCommandOptionsOnlyBuilder } from "discord.js";

export type Config = {
    id: string;
    intents: GatewayIntentBits[]
    name: string;
    token: string;
}

export type SlashCommand = {
    data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder,
    execute: (interaction: CommandInteraction) => Promise<InteractionResponse | Message>
}

export type SlashCommands = Record<string, SlashCommand>

export type Inator = {
    commands: SlashCommands,
    config: Config,
    onMessage?: (message: Message) => Promise<Message | null | void>
}