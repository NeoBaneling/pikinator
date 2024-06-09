import { Message } from 'discord.js';
import { Inator } from '../../common/types';
import { getConfig } from '../../util/get-config';
import { commands } from './commands';

const onMessage = async (message: Message) => {
    if (message.content === 'pika') {
        await message.reply('pika')
    }
}

const bot: Inator = { commands, config: getConfig('pikinator'), onMessage };
export default bot