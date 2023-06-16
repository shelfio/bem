import {setup} from 'bem-cn';
import type {BemSettings, Block} from 'bem-cn';

const defaultSettings: BemSettings = {
  el: '__',
  mod: '--',
  modValue: '',
};

const block = setup(defaultSettings);
export function createBlock(parentClass: string, styleModule?: Record<string, string>): Block {
  if (typeof styleModule === 'undefined') {
    return block(parentClass);
  }

  return setup({...defaultSettings, classMap: styleModule})(parentClass);
}
