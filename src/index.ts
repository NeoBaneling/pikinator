import { Client, Events } from 'discord.js';
import { bots } from './bots';
import { deployCommands } from './util/deployCommands';
import { Inator } from './common/inator';

export const loadClients = async (inators: Inator[]) => {
  await Promise.all(
    inators.map(({ commands, config, getRandomReply, name, onMessage }: Inator) => {
      const client = new Client({
        intents: config.intents,
      });

      client.once(Events.ClientReady, async () => {
        console.log(`[${name}] is ready!`);
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
          console.error(`[${name}] No command matching ${interaction.commandName} was found.`);
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
        // I can't think of a single situation where we'd want to respond to ourselves
        if (message.author.id === config.id) return;

        // Attempt to send a message in response to a message
        if (onMessage) {
          const msg = await onMessage(message);
          if (msg) return msg;
        }

        // When no message exists, attempt to provide a random reply
        const randReply = getRandomReply(message);
        if (randReply) await message.reply(randReply);

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
