import type {BemMods} from './bem.js';
import {setup} from './bem.js';

export function createBlock(parentClass: string, classMap?: Record<string, string>) {
  return setup({classMap})(parentClass);
}
export function b(block: ReturnType<typeof createBlock>): string;
export function b(block: ReturnType<typeof createBlock>, element: string): string;
export function b(
  block: ReturnType<typeof createBlock>,
  element: string,
  modifiers: BemMods
): string;
/** @deprecated Use the return function of createBlock */
export function b(...args: any[]) {
  const [bemBlock, ...rest] = args;

  return bemBlock(...rest);
}

export * from './bem.js';
