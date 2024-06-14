import { getConfig } from '../..//util/getConfig';
import { Inator } from '../../common/types';
import { eightBall, start } from './commands';

const bot: Inator = { commands: { ['8ball']: eightBall, start }, config: getConfig('atarinator') };
export default bot;
