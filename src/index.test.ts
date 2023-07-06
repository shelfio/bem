import {createBlock} from './index';

it('should not work with null and undefined', () => {
  try {
    // @ts-expect-error
    createBlock(undefined);
  } catch (error: any) {
    expect(error.toString()).toBe('Error: Block name should be a string');
  }
  try {
    // @ts-expect-error
    createBlock(null);
  } catch (error: any) {
    expect(error.toString()).toBe('Error: Block name should be a string');
  }
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

  expect(block({['']: 'modifier'})).toBe('Badger Badger--modifier');
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

it('should return class of BEM with element with cssModule', () => {
  const cssModule = {
    Drake__element: 'Drake__element_id2',
  };

  const block = createBlock('Drake', cssModule);

  expect(block('element').toString()).toBe('Drake__element_id2');
});

it('should return class of BEM with element with modifier and with cssModule', () => {
  const cssModule = {
    Eft__element: 'Eft__element_id',
    'Eft__element--modifier': 'Eft__element--modifier_id2',
  };

  const block = createBlock('Eft', cssModule);

  expect(block('element', {modifier: true}).toString()).toBe(
    'Eft__element_id Eft__element--modifier_id2'
  );
});

it('should return class of BEM with dynamic modifier', () => {
  const block = createBlock('Eft');
  const modifier = 'temp';

  expect(block('element', {[modifier]: true})).toBe('Eft__element, Eft__element--temp');
});

it('should return classname without id if not match in object', () => {
  const cssModule = {
    some: 'some_id',
  };

  const block = createBlock('Eft', cssModule);

  expect(block()).toBe('Eft');
});

it('should return bem block', () => {
  const block = createBlock('Eft');

  expect(block.b().toString()).toBe('Eft');
  expect(block.b('element').mix(['button']).toString()).toBe('Eft__element button');
});
