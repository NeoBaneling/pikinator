import { Message } from 'discord.js';
import { Inator } from '../../common/types';
import { getConfig } from '../../util/getConfig';
import { dieHit } from '../../common/random';
import { yourMom } from './util';

const YM_FREQ = 8;

const onMessage = async (message: Message) => {
  // your mom
  if (dieHit(YM_FREQ)) {
    await message.reply(yourMom());
  }
  return null;
};

const bot: Inator = { commands: {}, config: getConfig('quipinator'), onMessage };
export default bot;
