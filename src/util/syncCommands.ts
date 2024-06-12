import { bots } from "../bots";
import { Inator } from "../common/types";
import { deployCommands } from "./deployCommands";

export const syncCommands = async (inators: Inator[], guildId: string | undefined) => {
    if (!guildId) {
        console.error('Env variable DEV_GUILD_ID is not defined!');
        return;
    }
    await Promise.all(inators.map(async ({ commands, config }) => await deployCommands({ commands, config, guildId })));
}

syncCommands(bots, process.argv[2] ?? process.env.DEV_GUILD_ID);
