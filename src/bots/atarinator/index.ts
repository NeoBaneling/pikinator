import { getConfig } from '../..//util/getConfig';
import { Inator } from "../../common/types";
import { eightBall } from "./commands";

const bot: Inator = { commands: { ['8ball']: eightBall }, config: getConfig('atarinator')};
export default bot;