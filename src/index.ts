import { Client, Events, GatewayIntentBits } from "discord.js";
import { deployCommands } from "./deploy-commands";
import { commands } from "./commands";
import { config } from "./config";

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent]
})

client.once(Events.ClientReady, async () => {
    console.log('🤖 Discord bot is ready!')
})

client.on(Events.GuildCreate, async (guild) => {
    await deployCommands({ guildId: guild.id });
})

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }
    
    const { commandName } = interaction

    if (!commands[commandName as keyof typeof commands]) {
        console.error(`No command matching ${interaction.commandName} was found.`)
        return;
    }

    try {
        await commands[commandName as keyof typeof commands].execute(interaction)
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true })
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
        }
    }
})

client.on(Events.MessageCreate, async (message) => {
    if (message.content === 'pika' && message.author.id !== config.id) {
        await message.reply('pika')
    }
    return;
})

client.login(config.token)