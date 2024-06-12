import { execute } from '../ping';

describe('ping', () => {
  describe('when the command is executed', () => {
    const mockReply = jest.fn();
    beforeAll(() => {
      execute({ reply: mockReply } as any);
    });
    it('then it replies with pong', () => {
      expect(mockReply).toHaveBeenCalledWith('Pong!');
    });
  });
});
