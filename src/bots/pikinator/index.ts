import { Message } from 'discord.js';
import { Inator } from '../../common/inator';
import { getConfig } from '../../util/getConfig';
import { ping } from './commands';

const onMessage = async (message: Message) => {
  if (message.content === 'pika') {
    await message.reply('pika');
  }
  return null;
};

export default new Inator().setName('pikinator').setCommands({ ping }).setMessageHandler(onMessage);
