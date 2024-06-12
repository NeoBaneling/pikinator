import { faker } from '@faker-js/faker'
import { getConfig } from '../getConfig';
import { GatewayIntentBits } from 'discord.js';

describe('getConfig', () => {
    const OLD_ENV = process.env;

    let id: string;
    let name: string;
    let token: string;
    beforeAll(() => {
        id = faker.string.alphanumeric()
        name = faker.lorem.word()
        token = faker.string.alphanumeric()

        jest.resetModules()
        process.env = { ...OLD_ENV }
    })
    afterAll(() => {
        process.env = OLD_ENV;
    })
    describe('when id and token exist', () => {
        beforeAll(() => {
            process.env[`${name.toUpperCase()}_CLIENT_ID`] = id
            process.env[`${name.toUpperCase()}_TOKEN`] = token
        })
        it('then it returns the clientId', () => {
            expect(getConfig(name).id).toBe(id)
        })
        it('then it returns the expected intents', () => {
            expect(getConfig(name).intents).toEqual([GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent])
        })
        it('then it returns the name', () => {
            expect(getConfig(name).name).toBe(name)
        })
        it('then it returns the token', () => {
            expect(getConfig(name).token).toBe(token)
        })
    })
    describe('when id or token do not exist', () => {
        beforeAll(() => {
            process.env[`${name.toUpperCase()}_CLIENT_ID`] = ''
            process.env[`${name.toUpperCase()}_TOKEN`] = ''
        })
        it('then it throws an error', () => {
            expect(() => getConfig(name)).toThrowError(`[${name}] Missing environment variables`)
        })
    })
})