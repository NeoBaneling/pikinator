# ⚡️ Pika pika!

Small Node.js application that hosts a set of [Discord](https://discord.com/) bots, built on the [Discord.js](https://discord.js.org/docs/packages/discord.js/main) module.

## 🛠️ Setup

### 1. Install the required tools
- [Node v20.14.0](https://nodejs.org/en/download/package-manager)
- An IDE (I recommend [VSCode](https://code.visualstudio.com/download))
- The [repo](https://github.com/NeoBaneling/pikinator)!

### 2. Init your project
- At the root of the project, create a `.env.local` file. Ask for the values that need to be included
- In a terminal, run `npm install` at the project root

### 3. (optional) Configure VSCode
- Install the following VSCode extensions
    - [Jest Runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner)
    - [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- Configure your VSCode to autoformat on save
    - Navigate to your VSCode `settings.json` and paste the following into the JSON file:

```JSON
{
    "typescript.preferences.importModuleSpecifier": "relative",
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnPaste": false,
    "editor.formatOnSave": false,
    "[json]": { "editor.formatOnSave": true },
    "[javascript]": { "editor.formatOnSave": true },
    "[typescript]": {
        "editor.formatOnSave": true
    },
    "editor.tabSize": 2,
}
```

## 💪 Commands

- `npm run dev`
    - Run the dev env locally. Auto-updates on save
- `npm run build`
    - Build a production version of the app
- `npm start`
    - Runs the prod build
- `npm run lint`
    - Cleans syntax and formatting
- `npm test`
    - Runs all unit tests
- `npm run test:coverage`
    - Runs all tests with coverage
- `npm run sync -- [guildId?]`
    - Resyncs bot commands for a given Discord server. If no `guildId` is specified, it defaults to the dev server in your `.env.local`.

## 🤖 Creating a new bot

This short guide will walk you through all steps necessary to start developing with a new Discord bot.

### 1. Create a new Application with Discord Developers
- Navigate to the [Discord Developer portal](https://discord.com/developers/applications) and select "New Application"
- Enter an application name and agree to the TOS
- Copy the **APPLICATION ID** found on the General Information panel and store it in a safe place
- Select the Bot settings on the left hand side
- Select **Reset Token** and copy the generated token, storing it in a safe place
- Enable the **MESSAGE CONTENT INTENT** Priveleged Gateway Intent for the bot
- Select the OAuth2 tab and enable the **bots** scope
- Enable the following bot permissions:
    - GENERAL
        - Change Nickname
        - Read Messages/ View Channels
    - TEXT
        - Send Messages
        - Create Public Threads
        - Send Messages in Threads
        - Send TTS Messages
        - Embed Links
        - Attach Files
        - Read Message History
        - Mention Everyone
        - Add Reactions
        - Use Slash Commaands
        - Use Embedded Activities
    - VOICE
        - Connect
        - Speak
        - Use Voice Activity
        - Use Embedded Activities
        - Use Soundboard
- Copy the generated URL, paste it in your browser, and add the application to your server!

### 2. Configure env variables for the new bot
- Add your bot's values to the `.env.local`:
```
<INATOR_NAME>_CLIENT_ID=/* add your application ID */
<INATOR_NAME>_TOKEN=/* add your bot token */
```
- These values will also need to be added to the repo's secrets

### 3. Create your bot's files
- Create a new `src/bots/<inator-name>/index.ts` file, initialized with the following:
```ts
import { Message } from 'discord.js';
import { Inator } from '../../common/types';
import { getConfig } from '../../util/getConfig';

const onMessage = async (message: Message) => {
  return null;
};

const bot: Inator = { commands: { }, config: getConfig('<inator-name>'), onMessage };
export default bot;
```
- In `src/bots/index.ts` include your new bot in the list of bots
- If your bot needs commands, add a `src/bots/<inator-name>/commands/index.ts` file to bulk export all of the commands

You should be all set! Reference `pikinator` for examples on handling messages or commands.