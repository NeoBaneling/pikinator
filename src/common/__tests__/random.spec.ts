import { faker } from '@faker-js/faker';
import { applyRandomFmt, getRandOption } from '../random';

describe('getRandOption', () => {
  let options: any[];
  describe('when options do not have weights', () => {
    beforeEach(() => {
      options = [];
      for (let i = 0; i < 10; i++) {
        options.push(i % 2 ? faker.string.numeric() : faker.number.int());
      }
    });
    it('then it returns a random option from the list', () => {
      expect(options).toContainEqual(getRandOption(options));
    });
  });
  describe('when an option has zero weight', () => {
    beforeEach(() => {
      options = [{ str: faker.string.numeric(), weight: 0 }];
    });
    it('then the returned option does not have a weight', () => {
      expect(getRandOption(options)).not.toHaveProperty('weight');
    });
  });
  describe('when options have weight', () => {
    beforeEach(() => {
      options = [];
      for (let i = 0; i < 1; i++) {
        options.push({ str: faker.string.numeric(), weight: faker.number.int({ min: 1, max: 10 }) });
      }
    });
    it('then the returned option does not have a weight', () => {
      expect(getRandOption(options)).not.toHaveProperty('weight');
    });
  });
});

describe('applyRandomFmt', () => {
  let options: ((message: string) => string)[];
  let message: string;
  let forceOption: boolean;
  beforeAll(() => {
    message = faker.lorem.word();
  });
  describe('when forceOption is true', () => {
    let fmt: string;
    beforeAll(() => {
      forceOption = true;
      fmt = faker.lorem.word();
      options = [(str: string) => `${str}${fmt}`];
    });
    it('then the message is modified', () => {
      expect(applyRandomFmt(options, message, forceOption)).toBe(`${message}${fmt}`);
    });
  });
  describe('when forceOption is false', () => {
    beforeAll(() => {
      forceOption = false;
    });
    describe('and it selects no option', () => {
      beforeAll(() => {
        options = [];
      });
      it('then the message is not modified', () => {
        expect(applyRandomFmt(options, message, forceOption)).toBe(message);
      });
    });
  });
});
