import { REST, Routes } from 'discord.js';
import { Config, SlashCommands } from '../common/types';

interface DeployCommandsProps {
  commands: SlashCommands;
  config: Config;
  guildId: string;
}

export const deployCommands = async ({ commands, config, guildId }: DeployCommandsProps) => {
  const commandsData = Object.values(commands).map((command) => command.data);

  const rest = new REST({ version: '10' }).setToken(config.token);

  try {
    console.log(`[${config.name}] Started refreshing (/) commands`);

    await rest.put(Routes.applicationGuildCommands(config.id, guildId), {
      body: commandsData,
    });

    console.log(`[${config.name}] Successfully reloaded (/) commands`);
  } catch (error) {
    console.error(error);
  }
};
