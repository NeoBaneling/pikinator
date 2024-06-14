import { CommandInteraction, Message, TextChannel, ThreadAutoArchiveDuration } from 'discord.js';

/**
 * Attempts to create a thread in a channel
 * @param source The command or message that triggered the thread
 * @param name The name of the thread
 * @param autoArchiveDuration The amount of time after which the thread should automatically archive in case of no recent activity. Defaults to three days.
 * @returns whether the thread was created, and the thread ID if successful
 */
export const createThread = async (
  source: CommandInteraction | Message,
  name: string,
  autoArchiveDuration = ThreadAutoArchiveDuration.ThreeDays,
) => {
  if (source.channel instanceof TextChannel) {
    try {
      const thread = await source.channel.threads.create({
        name,
        autoArchiveDuration,
        startMessage: source instanceof Message ? source : undefined,
      });
      return { isSuccess: true, threadId: thread.id };
    } catch (error) {
      console.log(error);
      return { isSuccess: false, threadId: '' };
    }
  }
  return { isSuccess: false, threadId: '' };
};
