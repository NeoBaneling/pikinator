import { b, bi, cap, i } from '../../common/format';
import { applyRandomFmt, getRandOption } from '../../common/random';

const quipFmt = (options: { str: string; weight: number }[]) =>
  `${applyRandomFmt(
    [
      { fmt: (msg) => msg, weight: 13 },
      { fmt: b, weight: 3 },
      { fmt: i, weight: 3 },
      { fmt: bi, weight: 1 },
    ],
    applyRandomFmt(
      [
        { fmt: (msg) => msg, weight: 7 },
        { fmt: cap, weight: 1 },
      ],
      getRandOption(options, 'str'),
    ),
  )}`;

const randPunc = () =>
  getRandOption(
    [
      { str: '', weight: 3 },
      { str: '.', weight: 1 },
      { str: '!', weight: 1 },
    ],
    'str',
  );

export const yourMom = () => {
  return `${quipFmt([
    { str: 'your', weight: 14 },
    { str: 'ur', weight: 5 },
    { str: `you're`, weight: 1 },
  ])} ${quipFmt([
    { str: 'mom', weight: 10 },
    { str: 'mum', weight: 10 },
    { str: 'mother', weight: 5 },
    { str: 'mommy', weight: 4 },
    { str: `mom're`, weight: 1 },
  ])}${randPunc()}`;
};

export const sheSaid = () => {
  return `${getRandOption(
    [
      { str: `that's`, weight: 3 },
      { str: 'thats', weight: 1 },
    ],
    'str',
  )} what ${quipFmt([
    { str: 'she', weight: 11 },
    { str: 'he', weight: 7 },
    { str: 'they', weight: 2 },
  ])} said${randPunc()}`;
};
