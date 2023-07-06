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
