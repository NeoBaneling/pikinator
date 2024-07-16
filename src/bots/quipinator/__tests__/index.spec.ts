import bot from '..';
import { dieHit } from '../../../common/random';

jest.mock('../../../common/random', () => ({
  dieHit: jest.fn(),
}));
jest.mock('../util', () => ({
  yourMom: jest.fn().mockReturnValue('your mom'),
}));

describe('quipinator', () => {
  describe('onMessage', () => {
    const mockDieHit = dieHit as jest.Mock;
    const mockReply = jest.fn();
    afterEach(() => {
      mockReply.mockReset();
    });
    describe('your mom', () => {
      describe('when dieHit is success', () => {
        beforeAll(async () => {
          mockDieHit.mockReturnValue(true);
          await bot.onMessage!({ reply: mockReply } as any);
        });
        it('then it replies with your mom', () => {
          expect(mockReply).toHaveBeenCalledWith('your mom');
        });
      });
      describe('when dieHit fails', () => {
        beforeAll(async () => {
          mockDieHit.mockReturnValue(false);
          await bot.onMessage!({ reply: mockReply } as any);
        });
        it('then it does not reply', () => {
          expect(mockReply).not.toHaveBeenCalled();
        });
      });
    });
  });
});
