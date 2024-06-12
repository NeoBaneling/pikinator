const randInt = (max: number) => Math.floor(Math.random() * max);

export const getRandOption = (options: any[]) => options[randInt(options.length)];
