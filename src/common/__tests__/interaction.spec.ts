import { TextChannel, VoiceChannel } from 'discord.js';
import { createThread } from '../interaction';
import { faker } from '@faker-js/faker';

describe('createThread', () => {
  const textChannelPrototype = Object.create(TextChannel.prototype);
  let source: any;
  describe('given the source channel is a TextChannel', () => {
    beforeEach(() => {
      source = { channel: Object.assign(textChannelPrototype, {}) };
    });
    describe('when thread.create is successful', () => {
      let expectedThreadId: string;
      beforeEach(() => {
        expectedThreadId = faker.string.numeric(16);
        source.channel = Object.assign(textChannelPrototype, {
          threads: {
            create: jest.fn().mockResolvedValue({ id: expectedThreadId }),
          },
        });
      });
      it('then it returns the threadId', async () => {
        const { isSuccess, threadId } = await createThread(source, '');
        expect(isSuccess).toBeTruthy();
        expect(threadId).toBe(expectedThreadId);
      });
    });
    describe('when thread.create throws an error', () => {
      beforeEach(() => {
        source.channel = Object.assign(textChannelPrototype, {
          threads: {
            create: jest.fn().mockImplementation(() => {
              throw new Error('');
            }),
          },
        });
      });
      it('then it is not successful', async () => {
        const { isSuccess, threadId } = await createThread(source, '');
        expect(isSuccess).toBeFalsy();
        expect(threadId).toBe('');
      });
    });
  });
  describe('given the source channel is not a TextChannel', () => {
    beforeEach(() => {
      source = { channel: {} as VoiceChannel };
    });
    it('then it is not successful', async () => {
      const { isSuccess, threadId } = await createThread(source, '');
      expect(isSuccess).toBeFalsy();
      expect(threadId).toBe('');
    });
  });
});
