import { getConfig } from '@/src/util/get-config';
import { Inator } from "../../common/types";
import { commands } from "./commands";

const bot: Inator = { commands, config: getConfig('atarinator')};
export default bot;