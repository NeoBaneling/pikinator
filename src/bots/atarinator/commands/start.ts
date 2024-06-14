import { CommandInteraction, SlashCommandBuilder, TextChannel, ThreadAutoArchiveDuration } from 'discord.js';
import { getRandOption } from '../../../common/random';
import { createThread } from '../../../common/interaction';

export const data = new SlashCommandBuilder().setName('start').setDescription('starts a new game');

export const execute = async (interaction: CommandInteraction) => {
  const { isSuccess, threadId } = await createThread(interaction, 'New game');
  if (isSuccess) {
    return await interaction.reply(
      `${getRandOption(['Booting up', 'Beep boop beep beep boop', 'Awaking hamster'])}...`,
    );
  }
  return await interaction.reply(`bro I can't create a thread from a thread :unamused:`);
};
