// Basic string formatting
/**
 * bold
 */
export const b = (message: string) => `**${message}**`;
/**
 * italics
 */
export const i = (message: string) => `*${message}*`;
/**
 * strikethrough
 */
export const s = (message: string) => `~~${message}~~`;
/**
 * underline
 */
export const u = (message: string) => `__${message}__`;
/**
 * bold + italics
 */
export const bi = (message: string) => b(i(message));
/**
 * capitalize
 */
export const cap = (message: string) => `${message[0].toUpperCase()}${message.slice(1)}`;
