import { MsgFn, MsgFmtOptions } from './types';

const randInt = (max: number) => Math.floor(Math.random() * max);

/**
 * Rolls a die, attempting to get the highest possible value
 * @param target the number of sides of the die
 * @returns whether the die landed on the highest value
 */
export const dieHit = (target: number) => randInt(target) === target - 1;

/**
 * Selects a true random option from a given list
 * @param options the list to select from. Each option can have a weight property, which affects the likelihood that it will be selected.
 * @param key (optional) returns the key of the selected object rather than the object itself
 * @returns a true random option from the list, with weights omitted.
 * @example
 *
 */
export const getRandOption = (options: any[], key?: string) => {
  const weightedOptions = options.reduce((opts, currOption) => {
    let trueWeight = 1;
    let trueOption = currOption;

    if (currOption && Object.keys(currOption).includes('weight')) {
      const { weight, ...option } = currOption;
      trueWeight = weight || 1;
      trueOption = option;
    }

    for (let i = 0; i < trueWeight; i++) opts.push(trueOption);
    return opts;
  }, []);
  const option = weightedOptions[randInt(weightedOptions.length)];
  return option && key && Object.keys(option).includes(key) ? option[key] : option;
};

/**
 * Selects a random format from the list of options and applies that to the given message
 * @param options the list of formats select from
 * @param message the message to modify
 * @param forceOption (optional) whether the function *must* select an option. Defaults to false
 * @returns the modified message
 */
export const applyRandomFmt = (options: MsgFmtOptions, message: string, forceOption = false) => {
  const option = getRandOption(forceOption ? options : [...options, null], 'fmt');
  if (option) {
    return option(message);
  }
  return message;
};
