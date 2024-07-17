import { Client, Events } from 'discord.js';
import { faker } from '@faker-js/faker';
import { loadClients } from '../';
import { deployCommands } from '../util/deployCommands';

jest.mock('discord.js', () => ({
  ...jest.requireActual('discord.js'),
  Client: jest.fn(),
}));

jest.mock('../bots', () => ({
  bots: [],
}));

jest.mock('../util/deployCommands', () => ({
  deployCommands: jest.fn(),
}));

describe('loadClients', () => {
  const mockDeployCommands = deployCommands as jest.Mock;
  const mockLogin = jest.fn();
  const mockOnce = jest.fn();
  const mockOn = jest.fn();
  const mockExecute = jest.fn();
  const mockReplyMessage = jest.fn();
  const events: Record<string, any> = {};
  const logSpy = jest.spyOn(global.console, 'log');
  const errorSpy = jest.spyOn(global.console, 'error');

  let commands: Record<string, any>;
  let config: any;
  let guildId: string;
  let randomReplies: any[];

  beforeEach(() => {
    (Client as unknown as jest.Mock).mockImplementation(() => ({
      login: mockLogin.mockReturnThis(),
      once: mockOnce.mockImplementation((event: Events, callbackFn: any) => {
        events[event] = callbackFn;
        return this;
      }),
      on: mockOn.mockImplementation((event: Events, callbackFn: any) => {
        events[event] = callbackFn;
        return this;
      }),
    }));

    commands = { [`${faker.lorem.word()}`]: { execute: mockExecute } };
    config = {
      id: faker.string.alphanumeric(3),
      intents: [],
      name: faker.lorem.word(),
      token: faker.string.alphanumeric(),
    };
    guildId = faker.string.numeric();
    randomReplies = [{ onMessage: jest.fn().mockReturnValue(null) }, { onMessage: mockReplyMessage }];
  });
  afterEach(() => {
    mockLogin.mockClear();
    mockOnce.mockClear();
    mockOn.mockClear();
    mockDeployCommands.mockClear();
  });
  describe('when a bot exists', () => {
    const onMessageTrigger = jest.fn();
    beforeEach(async () => {
      await loadClients([
        {
          commands,
          config,
          name: config.name,
          onMessage: onMessageTrigger,
          randomReplies,
        } as any,
      ]);
    });
    afterEach(() => {
      onMessageTrigger.mockClear();
    });
    it('then it logs in', () => {
      expect(mockLogin).toHaveBeenCalledWith(config.token);
    });
    it('then it subscribes to ClientReady event', () => {
      expect(mockOnce).toHaveBeenCalledWith(Events.ClientReady, expect.anything());
    });
    [Events.GuildCreate, Events.InteractionCreate, Events.MessageCreate].forEach((testCase) => {
      it(`then it subscribes to ${testCase} event`, () => {
        expect(mockOn).toHaveBeenCalledWith(testCase, expect.anything());
      });
    });
    describe('when a ClientReady event is triggered', () => {
      beforeEach(async () => {
        await events[Events.ClientReady]();
      });
      it('then it prints a success command', () => {
        expect(logSpy).toHaveBeenCalledWith(`[${config.name}] is ready!`);
      });
    });
    describe('when a GuildCreate event is triggered', () => {
      beforeEach(async () => {
        await events[Events.GuildCreate]({ id: guildId });
      });
      it('then it calls deployCommands', () => {
        expect(mockDeployCommands).toHaveBeenCalledWith({ commands, config, guildId });
      });
    });
    describe('when an InteractionCreate event is triggered', () => {
      let interaction: any;
      describe('and the interaction is a command', () => {
        beforeEach(() => {
          interaction = { ...interaction, isCommand: jest.fn().mockReturnValue(true) };
        });
        describe('and the interaction is a valid command', () => {
          beforeEach(async () => {
            interaction = { ...interaction, commandName: Object.keys(commands)[0] };
          });
          describe('and the interaction is successful', () => {
            beforeEach(async () => {
              mockExecute.mockImplementation(() => 'success');
              await events[Events.InteractionCreate](interaction);
            });
            it('then it executes the interaction', () => {
              expect(mockExecute).toHaveBeenCalledWith(interaction);
            });
          });
          describe('and the interaction is unsuccessful', () => {
            let error: string;
            beforeEach(async () => {
              error = faker.lorem.sentence();
              mockExecute.mockImplementation(() => {
                throw new Error(error);
              });
              interaction = { ...interaction, reply: jest.fn() };
              await events[Events.InteractionCreate](interaction);
            });
            it('then it prints an error', async () => {
              expect(errorSpy).toHaveBeenCalledWith(new Error(error));
            });
            describe('and the interaction was not replied', () => {
              const mockReply = jest.fn();
              beforeEach(async () => {
                interaction = { ...interaction, replied: false, reply: mockReply };
                await events[Events.InteractionCreate](interaction);
              });
              it('then it replies with an error', () => {
                expect(mockReply).toHaveBeenCalledWith({
                  content: 'There was an error while executing this command!',
                  ephemeral: true,
                });
              });
            });
            describe('and the interaction was replied', () => {
              const mockFollowUp = jest.fn();
              beforeEach(async () => {
                interaction = { ...interaction, replied: true, followUp: mockFollowUp };
                await events[Events.InteractionCreate](interaction);
              });
              it('then it follows up with an error', () => {
                expect(mockFollowUp).toHaveBeenCalledWith({
                  content: 'There was an error while executing this command!',
                  ephemeral: true,
                });
              });
            });
          });
        });
        describe('and the interaction is an invalid command', () => {
          let commandName: string;
          beforeEach(async () => {
            commandName = faker.lorem.word();
            interaction = { ...interaction, commandName };
            await events[Events.InteractionCreate](interaction);
          });
          it('then it prints an error', () => {
            expect(errorSpy).toHaveBeenCalledWith(`[${config.name}] No command matching ${commandName} was found.`);
          });
        });
      });
      describe('and the interaction is not a command', () => {
        beforeEach(() => {
          interaction = { ...interaction, isCommand: jest.fn().mockReturnValue(false) };
        });
        it('then it returns void', async () => {
          expect(await events[Events.InteractionCreate](interaction)).toBeUndefined();
        });
      });
    });
    describe('when a MessageCreate event is triggered', () => {
      let message: any;
      describe('and the message author matches the client', () => {
        beforeEach(async () => {
          message = { author: { id: config.id } };
          await events[Events.MessageCreate](message);
        });
        it('then onMessage is not triggered', () => {
          expect(onMessageTrigger).not.toHaveBeenCalled();
        });
      });
      describe('and the message author does not match the client', () => {
        beforeEach(async () => {
          message = { author: { id: faker.string.alphanumeric(5) } };
          await events[Events.MessageCreate](message);
        });
        it('then onMessage is triggered', () => {
          expect(onMessageTrigger).toHaveBeenCalledWith(message);
        });
        it('then the random reply onMessage is triggered', () => {
          expect(mockReplyMessage).toHaveBeenCalledWith(message);
        });
      });
    });
    describe('when a ThreadCreate event is triggered', () => {
      const mockJoin = jest.fn();

      let thread: any;
      beforeEach(async () => {
        thread = { join: mockJoin };
        await events[Events.ThreadCreate](thread);
      });
      it('then the client joins the thread', () => {
        expect(mockJoin).toHaveBeenCalledTimes(1);
      });
    });
  });
});
