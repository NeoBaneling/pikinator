import { Client, Events } from 'discord.js';
import { bots } from './bots';
import { deployCommands } from './util/deployCommands';
import { Inator } from './common/types';

export const loadClients = async (inators: Inator[]) => {
  await Promise.all(
    inators.map(({ commands, config, onMessage }: Inator) => {
      const client = new Client({
        intents: config.intents,
      });

      client.once(Events.ClientReady, async () => {
        console.log(`[${config.name}] is ready!`);
      });

      client.on(Events.GuildCreate, async (guild) => {
        await deployCommands({ commands, config, guildId: guild.id });
      });

      client.on(Events.InteractionCreate, async (interaction) => {
        if (!interaction.isCommand()) {
          return;
        }

        const { commandName } = interaction;

        if (!commands[commandName as keyof typeof commands]) {
          console.error(`[${config.name}] No command matching ${interaction.commandName} was found.`);
          return;
        }

        try {
          await commands[commandName as keyof typeof commands].execute(interaction);
        } catch (error) {
          console.error(error);
          if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
              content: 'There was an error while executing this command!',
              ephemeral: true,
            });
          } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
          }
        }
      });

      client.on(Events.MessageCreate, async (message) => {
        if (onMessage && message.author.id !== config.id) {
          await onMessage(message);
        }
        return;
      });

      client.on(Events.ThreadCreate, async (thread) => {
        await thread.join();
      });

      return client.login(config.token);
    }),
  );
};

loadClients(bots);
