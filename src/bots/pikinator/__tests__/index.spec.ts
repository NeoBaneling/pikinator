import bot from '../';

jest.mock('../../../util/getConfig', () => ({
  getConfig: jest.fn(),
}));

describe('pikinator', () => {
  describe('onMessage', () => {
    describe('when message content is pika', () => {
      const mockReply = jest.fn();
      beforeAll(async () => {
        await bot.onMessage!({ content: 'pika', reply: mockReply } as any);
      });
      it('then it replies with pika', () => {
        expect(mockReply).toHaveBeenCalledWith('pika');
      });
    });
    describe('when message content is not pika', () => {
      const mockReply = jest.fn();
      beforeAll(async () => {
        await bot.onMessage!({ content: 'piko', reply: mockReply } as any);
      });
      it('then it does not reply', () => {
        expect(mockReply).not.toHaveBeenCalled();
      });
    });
  });
});
