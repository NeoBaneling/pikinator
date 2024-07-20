import { faker } from '@faker-js/faker';
import { getConfig } from '../../util/getConfig';
import { Inator } from '../inator';

jest.mock('../../util/getConfig', () => ({
  getConfig: jest.fn(),
}));

describe('Inator', () => {
  const mockConfig = getConfig as jest.Mock;

  beforeAll(() => {
    mockConfig.mockImplementation((name) => name);
  });

  let inator: Inator;
  describe('when the inator is constructed', () => {
    beforeAll(() => {
      inator = new Inator();
    });
    it('then all of the attributes are empty', () => {
      expect(inator.commands).toEqual({});
      expect(inator.config).toEqual({});
      expect(inator.name).toBe('');
      expect(inator.onMessage).toBeUndefined();
      expect(inator.getRandomReply('' as any)).toBe(null);
    });
    describe('when setCommands is called', () => {
      let commands: any;
      beforeAll(() => {
        commands = { [faker.lorem.word()]: '' };
        inator.setCommands(commands);
      });
      it('then commands is set', () => {
        expect(inator.commands).toBe(commands);
      });
    });
    describe('when setMessageHandler is called', () => {
      let onMessage: any;
      beforeAll(() => {
        onMessage = () => faker.lorem.sentence();
        inator.setMessageHandler(onMessage);
      });
      it('then it sets onMessage', () => {
        expect(inator.onMessage).toBe(onMessage);
      });
    });
    describe('when setName is called', () => {
      let name: string;
      beforeAll(() => {
        name = faker.lorem.word();
        inator.setName(name);
      });
      it('then name and config are set', () => {
        expect(inator.config).toBe(name);
        expect(inator.name).toBe(name);
      });
    });
    describe('when setRandomReplies is called', () => {
      let replyRes: string;
      let randomReplies: any[];
      beforeAll(() => {
        replyRes = faker.lorem.word();
        randomReplies = [
          { FREQ: faker.number.int({ min: 15 }), onMessage: jest.fn() },
          { FREQ: faker.number.int({ max: 14 }), onMessage: jest.fn().mockReturnValue(replyRes) },
        ];
        inator.setRandomReplies(randomReplies);
      });
      it('then it sets and sorts setRandomReplies', () => {
        expect(inator.getRandomReply('' as any)).toBe(replyRes);
      });
    });
  });
});
