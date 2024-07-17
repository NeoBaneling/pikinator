import { faker } from '@faker-js/faker';
import { b, bi, cap, i, s, u } from '../format';

describe('basic formatting', () => {
  const testCases = [
    {
      name: 'bold',
      fn: b,
      expectedStr: '**',
    },
    {
      name: 'italics',
      fn: i,
      expectedStr: '*',
    },
    {
      name: 'strikethrough',
      fn: s,
      expectedStr: '~~',
    },
    {
      name: 'underline',
      fn: u,
      expectedStr: '__',
    },
    {
      name: 'bold + italics',
      fn: bi,
      expectedStr: '***',
    },
  ];
  testCases.forEach(({ name, fn, expectedStr }) => {
    describe(`when ${name} format is called`, () => {
      let str: string;
      beforeAll(() => {
        str = faker.lorem.word();
      });
      it(`then it applies ${expectedStr}`, () => {
        expect(fn(str)).toBe(`${expectedStr}${str}${expectedStr}`);
      });
    });
  });
  describe('when cap is called', () => {
    let str: string;
    beforeAll(() => {
      str = faker.lorem.word();
    });
    it('then the first letter is capitalized', () => {
      expect(cap(str)).toBe(`${str[0].toUpperCase()}${str.slice(1)}`);
    });
  });
});
