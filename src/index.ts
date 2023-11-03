import * as bemCn from 'bem-cn';
import type {BemSettings, Block} from 'bem-cn';

const defaultSettings: BemSettings = {
  el: '__',
  mod: '--',
  modValue: '',
};

export type BemModifier = string | (string | boolean | undefined | null)[];

const block = bemCn.setup(defaultSettings);
export function createBlock(parentClass: string, styleModule?: Record<string, string>) {
  const bem =
    typeof styleModule === 'undefined'
      ? block(parentClass)
      : bemCn.setup({...defaultSettings, classMap: styleModule})(parentClass);

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
  modifiers: Parameters<typeof toBemModifiers>[0]
): string;
/** @deprecated Use the return function of createBlock */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function b(...args: any[]) {
  const [bemBlock, element, modifiers] = args;

  if (args.length === 1) {
    return bemBlock();
  }

  if (args.length === 2) {
    return bemBlock(element);
  }

  const mods = toBemModifiers(modifiers);

  if (!element) {
    return bemBlock(mods);
  }

  return bemBlock(element, mods);
}

function toBemModifiers(modifiers: BemModifier) {
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
