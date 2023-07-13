import {setup} from 'bem-cn';
import type {BemSettings, Block} from 'bem-cn';

const defaultSettings: BemSettings = {
  el: '__',
  mod: '--',
  modValue: '',
};

const block = setup(defaultSettings);
export function createBlock(parentClass: string, styleModule?: Record<string, string>) {
  const bem =
    typeof styleModule === 'undefined'
      ? block(parentClass)
      : setup({...defaultSettings, classMap: styleModule})(parentClass);

  function bemBlock(...args: Parameters<Block>) {
    return bem(...args).toString();
  }
  bemBlock.b = bem;

  return bemBlock;
}
export function b(block: ReturnType<typeof createBlock>): string;
export function b(block: ReturnType<typeof createBlock>, element: string): string;
export function b(
  block: ReturnType<typeof createBlock>,
  element: string,
  modifiers: string | (string | boolean)[]
): string;
/** @deprecated Use the return function of createBlock */
export function b(...args: any[]) {
  const [bemBlock, element, modifiers] = args;

  if (args.length === 1) {
    return bemBlock();
  }

  if (args.length === 2) {
    return bemBlock(element);
  }

  return bemBlock(element, toBemModifiers(modifiers));
}

function toBemModifiers(modifiers: string | (string | boolean)[]) {
  if (Array.isArray(modifiers)) {
    return modifiers
      .filter(mod => typeof mod === 'string')
      .reduce<Record<string, true>>((acc, modifier) => {
        acc[modifier as string] = true;

        return acc;
      }, {});
  }

  return {[modifiers]: true};
}
