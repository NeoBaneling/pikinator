import { Inator } from '../../common/inator';
import { eightBall, start } from './commands';

export default new Inator().setName('atarinator').setCommands({ ['8ball']: eightBall, start });
