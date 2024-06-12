import { Message } from 'discord.js';
import { Inator } from '../../common/types';
import { getConfig } from '../../util/getConfig';
import { ping } from './commands';

const onMessage = async (message: Message) => {
    if (message.content === 'pika') {
        await message.reply('pika')
    }
}

const bot: Inator = { commands: { ping }, config: getConfig('pikinator'), onMessage };
export default bot