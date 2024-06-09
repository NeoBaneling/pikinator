import dotenv from 'dotenv'

dotenv.config({ path: ['.env.local', '.env']});

const { DISCORD_TOKEN, DISCORD_CLIENT_ID } = process.env

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID) {
    throw new Error('Missing environment variables')
}

export const config = {
    token: DISCORD_TOKEN,
    id: DISCORD_CLIENT_ID
}