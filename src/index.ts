import type {BemCn, BemItem, BemMods, Block} from 'bem-cn';
import bemCn, {setup} from 'bem-cn';
import {has, isArray, isEmpty, isString, uniq} from './helpers';

export type BemModifier = string | boolean | undefined | BemModifier[];

type BemModify = (
  blockName?: string,
  mod?: string | BemMods | null
) => BemItem | string | undefined;

export type BemBlock = Block | BemModify;

const block: BemCn = setup({
  el: '__',
  mod: '--',
  modValue: '',
});

const createBlock = (parentClass = '', styleModule?: Record<string, string>): BemBlock => {
  const styleBlock = block(parentClass || '');

  if (isEmpty(styleModule)) {
    return styleBlock;
  }

  return (
    blockName: string | null = null,
    mod: BemMods | string | null = null
  ): BemItem | string => {
    // Creates bem classname with/without modifier.
    // For example 'Announcement' or 'Announcement__info' or 'Announcement Announcement--modifier' etc.
    // (depends on blockName and modifier)
    //

    const styleBlockWithBem = styleBlock(blockName as string, mod as string | BemMods);

    // Splits classmate to array by empty space
    const splittedStyleBlock = styleBlockWithBem.toString().split(/\s+/);

    // If we haven't modifier, classname don't not contain empty spaces.
    // We can return classname from css-modules with id  if it's exist
    //
    if (!mod && has(styleModule, styleBlockWithBem.toString()) && styleModule) {
      return styleModule[styleBlockWithBem];
    }

    // If we have modifier, classname contain empty spaces.
    // So need to check is there at least 1 classname which exists in css-module object
    // Then replace all values with appropriate from css-modules and converts to classname string.
    //
    if (mod && splittedStyleBlock.some(className => has(styleModule, className))) {
      return splittedStyleBlock
        .map(className => (styleModule ? styleModule[className] : undefined))
        .join(' ');
    }

    // If not match with previous conditions. Return simple BemItem.
    return styleBlockWithBem;
  };
};

const blazeHelper = (
  bemBlock: BemModify,
  element: string | undefined = '',
  modifier: BemModifier = ''
): BemItem | string | undefined => {
  const hasElement = isString(element) && !isEmpty(element);
  const isFewMods = isArray(modifier) && !isEmpty(modifier);
  const hasModifier = (isString(modifier) && !isEmpty(modifier)) || isFewMods;
  const elementOrUndefined = hasElement ? element : undefined;

  if (!hasElement && !hasModifier) {
    return bemBlock();
  }

  if (hasModifier && !isFewMods) {
    return bemBlock(elementOrUndefined, {['']: modifier});
  }

  if (hasModifier && isFewMods) {
    if (isArray(modifier)) {
      return uniq(
        modifier
          .map((mod): string => bemBlock(elementOrUndefined, {['']: mod})?.toString() ?? '')
          .join(' ')
          .split(' ')
      ).join(' ');
    }
  }

  return bemBlock(element);
};

const b = (bemBlock: BemBlock, element = '', modifier: BemModifier = ''): string =>
  blazeHelper(bemBlock as BemModify, element, modifier)?.toString() ?? '';

export {createBlock, b, blazeHelper, bemCn};
