import { Message } from 'discord.js';
import { dieHit } from './random';

type ReplyCallback = (message: Message) => string | null;

export class ReplyBuilder {
  callback: ReplyCallback;
  FREQ: number;
  freq: number;
  THRESHOLD: number;

  constructor() {
    this.callback = () => null;
    this.FREQ = 0;
    this.freq = 0;
    this.THRESHOLD = 0;
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

  /**
   * Sets the threshold for the reply
   * NOTE: If the threshold is greater than the frequency, then the threshold is set to 0
   * @param threshold The minimum number of messages (exclusive) that must pass before a reply can be set
   * @example // Threshold limits the minimum messages before a reply
   * new ReplyBuilder().setFrequency(6).setThreshold(2);
   * // > rub          ❌
   * // > some         ❌
   * // > bacon on it  ✅
   *
   * @example // Threshold is overwritten when it exceeds frequency
   * const reply = new ReplyBuilder().setFrequency(2).setThreshold(5);
   * console.log(reply.THRESHOLD);
   * // > 0
   */
  setThreshold(threshold: number) {
    this.THRESHOLD = threshold <= this.FREQ ? threshold : 0;
    return this;
  }

  onMessage(message: Message): string | null {
    if (this.THRESHOLD <= this.FREQ - this.freq && dieHit(this.freq)) {
      this.freq = this.FREQ;
      return this.callback(message);
    } else {
      this.freq--;
    }
    return null;
  }
}
