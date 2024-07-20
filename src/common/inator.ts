import { Message } from 'discord.js';
import { Config, SlashCommands } from './types';
import { ReplyBuilder } from './replyBuilder';
import { getConfig } from '../util/getConfig';

type MessageHandler = (message: Message) => Promise<Message | null>;

export class Inator {
  commands: SlashCommands;
  config: Config;
  name: string;
  onMessage?: MessageHandler;
  protected randomReplies: ReplyBuilder[];

  constructor() {
    this.commands = {} as SlashCommands;
    this.config = {} as Config;
    this.name = '';
    this.randomReplies = [];
  }

  /**
   * Sets the slash commands for this bot
   * @param commands An object of commands
   */
  setCommands(commands: SlashCommands) {
    this.commands = commands;
    return this;
  }

  /**
   * Sets the callback function that is triggered when a message is received
   * NOTE: random replies should not be included in this handler, but should be provided in "setRandomReplies()"
   * @param onMessage The function that may provide a message
   */
  setMessageHandler(onMessage: MessageHandler) {
    this.onMessage = onMessage;
    return this;
  }

  /**
   * Sets the name of the bot and gets the bot's configuration
   * @param name The name of the bot
   */
  setName(name: string) {
    this.name = name;
    this.config = getConfig(name);
    return this;
  }

  /**
   * Sets the array of random replies that are triggered when a message is received
   * NOTE: responses that require complex responses or interaction should be included in the "setMessageHandler()" callback function
   * @param randomReplies The array of random replies
   */
  setRandomReplies(randomReplies: ReplyBuilder[]) {
    this.randomReplies = randomReplies;
    this.sortRandomReplies();
    return this;
  }

  /**
   * Iterates over all random replies and selects a lucky reply, then re-sorts all random replies based on their new frequencies
   * @param message The incoming message to be replied to
   * @returns a random reply, or null if no reply was selected
   */
  getRandomReply(message: Message): string | null {
    const reply = this.randomReplies.reduce(
      (selectedReply, reply) => selectedReply || reply.onMessage(message),
      null as string | null,
    );

    this.sortRandomReplies();

    return reply;
  }

  protected sortRandomReplies() {
    this.randomReplies = this.randomReplies.sort((a, b) => a.freq - b.freq);
  }
}
