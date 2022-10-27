import {b, blazeHelper, createBlock} from './index';

describe('bem lib functions', () => {
  it('block should not work with null and undefined', () => {
    try {
      createBlock(undefined).toString();
    } catch (error) {
      expect(error.toString()).toBe('Error: Block name should be non-empty');
    }
    try {
      createBlock(null).toString();
    } catch (error) {
      expect(error.toString()).toBe('Error: Block name should be non-empty');
    }
  });

  it('block should return string for class', () => {
    expect(createBlock('Warthog').toString()).toBe('Warthog');
  });

  it('block to be class of BEM', () => {
    const block = createBlock('Hedgehog');

    expect(block()).toBe('Hedgehog');
  });

  it('block to be class of BEM without element, but with modifier and original class', () => {
    const block = createBlock('Badger');

    expect(block(null, {['']: 'modifier'}).toString()).toBe('Badger Badger--modifier');
  });

  it('block to be class of BEM with element', () => {
    const block = createBlock('Drake');

    expect(block('element').toString()).toBe('Drake__element');
  });

  it('block to be class of BEM with element and modifier', () => {
    const block = createBlock('Eft');

    expect(block('element', {['']: 'modifier'}).toString()).toBe(
      'Eft__element Eft__element--modifier'
    );
  });

  it('block to be class of BEM with cssModule', () => {
    const cssModule = {
      Hedgehog: 'Hedgehog_index',
    };

    const block = createBlock('Hedgehog', cssModule);

    expect(block()).toBe('Hedgehog_index');
  });

  it('block to be class of BEM without element, but with modifier and original class with cssModule', () => {
    const cssModule = {
      Badger: 'Badger_index',
      'Badger--modifier': 'Badger--modifier_index2',
    };

    const block = createBlock('Badger', cssModule);

    expect(block(null, {['']: 'modifier'})).toBe('Badger_index Badger--modifier_index2');
  });

  it('block to be class of BEM with element with cssModule', () => {
    const cssModule = {
      Drake__element: 'Drake__element_id2',
    };

    const block = createBlock('Drake', cssModule);

    expect(block('element')).toBe('Drake__element_id2');
  });

  it('block to be class of BEM with element with modifier and with cssModule', () => {
    const cssModule = {
      Eft__element: 'Eft__element_id',
      'Eft__element--modifier': 'Eft__element--modifier_id2',
    };

    const block = createBlock('Eft', cssModule);

    expect(block('element', {['']: 'modifier'})).toBe('Eft__element_id Eft__element--modifier_id2');
  });

  it('block should return classname without id if not match in object', () => {
    const cssModule = {
      some: 'some_id',
    };

    const block = createBlock('Eft', cssModule);

    expect(block().toString()).toBe('Eft');
  });

  it('blazeHelper to be class of BEM', () => {
    const block = createBlock('Fawn');

    expect(blazeHelper(block).toString()).toBe('Fawn');
  });

  it('blazeHelper to be class of BEM without element, but with modifier and original class', () => {
    const block = createBlock('Gibbon');

    expect(blazeHelper(block, '', 'modifier').toString()).toBe('Gibbon Gibbon--modifier');
  });

  it('blazeHelper to be class of BEM without element, but with modifier as array', () => {
    const block = createBlock('Gibbon');

    expect(blazeHelper(block, '', ['modifier']).toString()).toBe('Gibbon Gibbon--modifier');
  });

  it('blazeHelper to be class of BEM with element', () => {
    const block = createBlock('Heron');

    expect(blazeHelper(block, 'element').toString()).toBe('Heron__element');
  });

  it('blazeHelper to be class of BEM with element and modifier', () => {
    const block = createBlock('Jackalope');

    expect(blazeHelper(block, 'element', 'modifier').toString()).toBe(
      'Jackalope__element Jackalope__element--modifier'
    );
  });

  it('b to be class of BEM', () => {
    const block = createBlock('Koala');

    expect(b(block)).toBe('Koala');
  });

  it('b to be class of BEM without element, but with modifier and original class', () => {
    const block = createBlock('Lynx');

    expect(b(block, '', 'modifier')).toBe('Lynx Lynx--modifier');
  });

  it('b to be class of BEM with element', () => {
    const block = createBlock('Meerkat');

    expect(b(block, 'element')).toBe('Meerkat__element');
  });

  it('b to be class of BEM with element and modifier', () => {
    const block = createBlock('Narwhal');

    expect(b(block, 'element', 'modifier')).toBe('Narwhal__element Narwhal__element--modifier');
  });

  it('b to be class of BEM with element and modifier in array', () => {
    const block = createBlock('Narwhal');

    expect(b(block, 'element', ['modifier'])).toBe('Narwhal__element Narwhal__element--modifier');
  });

  it('b to be class of BEM with element and multiple modifiers in array', () => {
    const block = createBlock('Narwhal');

    expect(b(block, 'element', ['modifier', 'second-modifier'])).toBe(
      'Narwhal__element Narwhal__element--modifier Narwhal__element--second-modifier'
    );
  });
});
