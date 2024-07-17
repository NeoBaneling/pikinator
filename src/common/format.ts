// Basic string formatting

import { MsgFn } from './types';

/**
 * bold
 */
export const b: MsgFn = (message: string) => `**${message}**`;
/**
 * italics
 */
export const i: MsgFn = (message: string) => `*${message}*`;
/**
 * strikethrough
 */
export const s: MsgFn = (message: string) => `~~${message}~~`;
/**
 * underline
 */
export const u: MsgFn = (message: string) => `__${message}__`;
/**
 * bold + italics
 */
export const bi: MsgFn = (message: string) => b(i(message));
/**
 * capitalize
 */
export const cap: MsgFn = (message: string) => `${message[0].toUpperCase()}${message.slice(1)}`;
