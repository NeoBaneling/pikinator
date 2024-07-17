import { Message } from 'discord.js';
import { dieHit } from './random';

type ReplyCallback = (message: Message) => string | null;

export class ReplyBuilder {
  FREQ: number;
  freq: number;
  callback: ReplyCallback;

  constructor() {
    this.FREQ = 0;
    this.freq = 0;
    this.callback = () => null;
  }

  /**
   * Sets the average frequency of the reply
   * @param freq The number of average messages that should pass before the reply is sent
   */
  setFrequency(freq: number) {
    this.FREQ = freq;
    this.freq = freq;
    return this;
  }

  /**
   * Sets the function that should be called to get a reply message
   * @param reply The function that provides a reply message
   */
  setReply(reply: ReplyCallback) {
    this.callback = reply;
    return this;
  }

  onMessage(message: Message): string | null {
    if (dieHit(this.freq)) {
      this.freq = this.FREQ;
      return this.callback(message);
    } else {
      this.freq--;
    }
    return null;
  }
}
