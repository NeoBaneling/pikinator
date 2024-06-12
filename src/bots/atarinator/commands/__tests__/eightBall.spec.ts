import { getRandOption } from '../../../../common/random';
import { faker } from '@faker-js/faker';
import { execute } from '../eightBall';

jest.mock('../../../../common/random', () => ({
  getRandOption: jest.fn(),
}));

describe('8ball', () => {
  const mockRandOption = getRandOption as jest.Mock;
  describe('when the command is executed', () => {
    const mockReply = jest.fn();
    let input: string;
    let res: string;
    beforeAll(() => {
      input = faker.lorem.sentence();
      res = faker.lorem.word();
      mockRandOption.mockReturnValue(res);
      execute({ options: { data: [{ value: input }] }, reply: mockReply } as any);
    });
    it('then it replies with a random option', () => {
      expect(mockReply).toHaveBeenCalledWith(`> ${input}\n:8ball: ${res}`);
    });
  });
});
