import { yourMom } from '../util';

jest.mock('../../../common/random', () => ({
  applyRandomFmt: jest.fn().mockImplementation((options, str) => options[0].fmt(str)),
  getRandOption: jest.fn().mockImplementation((options) => options[0].str),
}));

describe('yourMom', () => {
  describe('when yourMom is triggered', () => {
    it('then it returns a randomly formatted yourMom', () => {
      expect(yourMom()).toBe('your mom');
    });
  });
});
