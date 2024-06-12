import { getRandOption } from "../../../common/random";
import { CommandInteraction, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('Asks a question to the magic 8 ball')
    .addStringOption(new SlashCommandStringOption()
        .setName('question')
        .setDescription('A question for the magic 8 ball')
        .setRequired(true)
    );

export const execute = async (interaction: CommandInteraction) => interaction.reply(
    `> ${interaction.options.data[0].value}\n:8ball: ${getRandOption([
        'Definitely',
        'It is certain',
        'Most likely',
        'Outlook good',
        'Signs Point to Yes',
        'Without a doubt',
        'YES',
        'You may rely on it',
        'Ask Again Later',
        'Better not tell you now',
        'It is decidedly so',
        'My reply is no',
        'My sources say no',
        'Very doubtful'
    ])}`);