import { faker } from '@faker-js/faker';
import { getRandOption } from '../random';

describe('getRandOption', () => {
  let options: string[];
  beforeEach(() => {
    options = [];
    for (let i = 0; i < 10; i++) {
      options.push(faker.string.numeric());
    }
  });
  it('then it returns a random option from the list', () => {
    expect(options).toContain(getRandOption(options));
  });
});
