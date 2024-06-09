import { SlashCommands } from '../../../common/types';
import * as ping from './ping';
import * as user from './user';

export const commands: SlashCommands = {
    ping,
    user
}