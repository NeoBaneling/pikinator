import { faker } from '@faker-js/faker';
import { dieHit } from '../random';
import { ReplyBuilder } from '../replyBuilder';

jest.mock('../random', () => ({
  dieHit: jest.fn(),
}));

describe('ReplyBuilder', () => {
  const mockDieHit = dieHit as jest.Mock;
  let replyBuilder: ReplyBuilder;
  beforeAll(() => {
    mockDieHit.mockReturnValue(false);
  });
  describe('when a ReplyBuilder is constructed', () => {
    beforeAll(() => {
      replyBuilder = new ReplyBuilder();
    });
    it('then frequency is 0', () => {
      expect(replyBuilder.FREQ).toBe(0);
      expect(replyBuilder.freq).toBe(0);
    });
    it('then threshold is 0', () => {
      expect(replyBuilder.THRESHOLD).toBe(0);
    });
    describe('when the frequency is set', () => {
      let freq: number;
      beforeAll(() => {
        freq = faker.number.int({ min: 1 });
        replyBuilder.setFrequency(freq);
      });
      it('then frequency is set value', () => {
        expect(replyBuilder.FREQ).toBe(freq);
        expect(replyBuilder.freq).toBe(freq);
      });
      describe('when the callback is set', () => {
        let res: string | null;
        let callbackVal: string;
        beforeAll(() => {
          callbackVal = faker.lorem.sentence();
          replyBuilder.setReply(() => callbackVal);
        });
        describe('and the die does not hit', () => {
          beforeAll(() => {
            mockDieHit.mockReturnValue(false);
            res = replyBuilder.onMessage('' as any);
          });
          it('then onMessage returns null', () => {
            expect(res).toBeNull();
          });
          it('then freq is decremented', () => {
            expect(replyBuilder.freq).toBe(freq - 1);
          });
        });
        describe('and the die hits', () => {
          beforeAll(() => {
            mockDieHit.mockReturnValue(true);
            res = replyBuilder.onMessage('' as any);
          });
          it('then onMessage returns the value', () => {
            expect(res).toBe(callbackVal);
          });
          it('then freq is reset', () => {
            expect(replyBuilder.freq).toBe(freq);
          });
        });
      });
    });
    describe('when the threshold is set', () => {
      let threshold: number;
      beforeAll(() => {
        threshold = faker.number.int({ min: 5, max: 10 });
        replyBuilder.setFrequency(faker.number.int({ min: threshold + 1 })).setThreshold(threshold);
      });
      it('then threshold is set value', () => {
        expect(replyBuilder.THRESHOLD).toBe(threshold);
      });
      describe('when the callback is set', () => {
        let res: string | null;
        let callbackVal: string;
        beforeAll(() => {
          callbackVal = faker.lorem.sentence();
          replyBuilder.setReply(() => callbackVal);
          mockDieHit.mockReturnValue(true);
          res = replyBuilder.onMessage('' as any);
        });
        it('then onMessage returns null', () => {
          expect(res).toBeNull();
        });
      });
    });
    describe('when the threshold is set and it is greater than the frequency', () => {
      beforeAll(() => {
        replyBuilder.setFrequency(faker.number.int({ max: 5 })).setThreshold(faker.number.int({ min: 7 }));
      });
      it('then the threshold is zero', () => {
        expect(replyBuilder.THRESHOLD).toBe(0);
      });
    });
  });
});
