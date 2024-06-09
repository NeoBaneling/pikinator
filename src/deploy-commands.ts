import { REST, Routes } from "discord.js";
import { commands } from "./commands";
import { config } from "./config";

const commandsData = Object.values(commands).map((command) => command.data);

const rest = new REST({ version: '10' }).setToken(config.token)

type DeployCommandsProps = {
    guildId: string;
}

export const deployCommands = async ({ guildId }: DeployCommandsProps) => {
    try {
        console.log('🤖 Started refreshing application (/) commands')

        await rest.put(
            Routes.applicationGuildCommands(config.id, guildId),
            {
                body: commandsData
            }
        )

        console.log('Successfully reloaded application (/) commands.')
    } catch (error) {
        console.error(error);
    }
}