import {b, block, createBlock, setup} from './index.js';

it('should not work with non empty string block', () => {
  try {
    // @ts-expect-error test
    createBlock(undefined);
  } catch (error: any) {
    expect(error.toString()).toBe('Error: Block name should be non-empty string');
  }
  try {
    // @ts-expect-error test
    createBlock(null);
  } catch (error: any) {
    expect(error.toString()).toBe('Error: Block name should be non-empty string');
  }
  try {
    createBlock('');
  } catch (error: any) {
    expect(error.toString()).toBe('Error: Block name should be non-empty string');
  }
});

it('should export block with default settings', () => {
  const b = block('button');

  expect(b('text')).toBe('button__text');
  expect(b('text', ['active'])).toBe('button__text button__text--active');
});

it('should setup block with custom split settings', () => {
  const block = setup({el: '**', mod: '++'});
  const b = block('button');

  expect(b('text')).toBe('button**text');
  expect(b('text', ['active'])).toBe('button**text button**text++active');
  expect(b({disabled: true})).toBe('button button++disabled');
});

it('should setup block with custom namespace', () => {
  const block = setup({ns: 'shelf_'});
  const b = block('button');

  expect(b('text')).toBe('shelf_button__text');
  expect(b('text', ['active'])).toBe('shelf_button__text shelf_button__text--active');
  expect(b({disabled: true})).toBe('shelf_button shelf_button--disabled');
});

it('should return bem classname', () => {
  const block = createBlock('Warthog');

  expect(block()).toBe('Warthog');
});

it('return classname when no modifiers provided', () => {
  const block = createBlock('Hedgehog');

  expect(block()).toBe('Hedgehog');
});

it('should return classname with element', () => {
  const block = createBlock('Drake');

  expect(block('element')).toBe('Drake__element');
});

it('should return classname with modifiers only', () => {
  const block = createBlock('Badger');

  expect(block({modifier: true})).toBe('Badger Badger--modifier');
});

it('should return classname with element and modifiers', () => {
  const block = createBlock('Eft');

  expect(block('element', {modifier: true})).toBe('Eft__element Eft__element--modifier');
});

it('should return block class with cssModule', () => {
  const cssModule = {
    Hedgehog: 'Hedgehog_index',
  };

  const block = createBlock('Hedgehog', cssModule);

  expect(block()).toBe('Hedgehog_index');
});

it('should helper to allow passing modifiers as array', () => {
  const block = createBlock('nav');

  const isActive = true,
    isDisabled = false,
    isHidden = undefined,
    modifier = 'custom';

  expect(b(block)).toBe('nav');
  expect(b(block, 'item')).toBe('nav__item');
  expect(b(block, 'item', ['active', 'disabled'])).toBe(
    'nav__item nav__item--active nav__item--disabled'
  );

  expect(b(block, '', ['active', 'disabled'])).toBe('nav nav--active nav--disabled');
  expect(
    b(block, 'item', [
      isActive && 'active',
      isDisabled && 'disabled',
      modifier,
      isHidden && 'hidden',
    ])
  ).toBe('nav__item nav__item--active nav__item--custom');
});

it('should return class of BEM with element with modifier and with cssModule', () => {
  const cssModule = {
    Eft__element: 'Eft__element_id',
    'Eft__element--modifier': 'Eft__element--modifier_id2',
  };

  const block = createBlock('Eft', cssModule);

  expect(block('element', {modifier: true})).toBe('Eft__element_id Eft__element--modifier_id2');
});

it('should return class of BEM with dynamic modifier', () => {
  const block = createBlock('Eft');
  const modifier = 'temp';

  expect(block('element', {[modifier]: true})).toBe('Eft__element Eft__element--temp');
});
