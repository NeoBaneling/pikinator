import { faker } from '@faker-js/faker';
import { deployCommands } from '../deployCommands';
import { REST, Routes } from 'discord.js';

jest.mock('discord.js', () => ({
  ...jest.requireActual('discord.js'),
  REST: jest.fn(),
}));

describe('deployCommands', () => {
  const mockRest = REST as unknown as jest.Mock;

  let commands: any;
  let commandData: string[];
  let config: any;
  let guildId: string;
  beforeAll(() => {
    commands = {};
    commandData = [];
    for (let i = 0; i < 3; i++) {
      const data = faker.lorem.word();
      commands[faker.lorem.word()] = {
        data,
      };
      commandData.push(data);
    }
    config = { id: faker.string.alphanumeric(), name: faker.lorem.word(), token: faker.string.alphanumeric() };
    guildId = faker.string.numeric();

    (Routes.applicationGuildCommands as unknown as jest.Mock) = jest.fn();
  });
  describe('when the put command is successful', () => {
    const mockPut = jest.fn();
    beforeAll(() => {
      mockRest.mockImplementation(() => ({
        setToken: jest.fn().mockReturnThis(),
        put: mockPut,
      }));
      deployCommands({ commands, config, guildId });
    });
    it('then it is called with command data', () => {
      expect(mockPut).toHaveBeenCalledWith(undefined, { body: commandData });
    });
  });
  describe('when the put command fails', () => {
    const errorSpy = jest.spyOn(global.console, 'error');

    let error: string;
    beforeAll(() => {
      error = faker.lorem.sentence();
      mockRest.mockImplementation(() => ({
        setToken: jest.fn().mockReturnThis(),
        put: jest.fn().mockImplementation(async () => {
          throw new Error(error);
        }),
      }));
      deployCommands({ commands, config, guildId });
    });
    it('then it prints an error', () => {
      expect(errorSpy).toHaveBeenCalledWith(new Error(error));
    });
  });
});
