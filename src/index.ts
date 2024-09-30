export const ERROR_BLOCK_NAME_EMPTY = 'Block name should be non-empty string';

export type BemSettings = {
  ns?: string;
  el: string;
  mod: string;
  classMap?: Record<string, string>;
};

export type BemMods =
  | {
      [mod: string]: string | boolean | undefined | null;
    }
  | Array<string | boolean | null | undefined>;

type BemContext = {
  name: string;
  mods?: BemMods;
};

export type BemBlock = {
  (): string;
  (element: string | BemMods): string;
  (element: string, mods: BemMods): string;
};

const defaultSettings: BemSettings = {
  el: '__',
  mod: '--',
};

const isString = (nameOrMods: string | BemMods): nameOrMods is string =>
  typeof nameOrMods === 'string';

function getModsList(mods: BemMods): string[] {
  if (Array.isArray(mods)) {
    return mods.filter(Boolean) as string[];
  }

  return Object.keys(mods).filter(key => mods[key]);
}

const toString = (settings: BemSettings, context: BemContext) => {
  const {name, mods} = context;
  let classes: string[] = [name];

  // Add list of modifiers
  if (mods) {
    classes = classes.concat(getModsList(mods).map(modifier => name + settings.mod + modifier));
  }

  // Add namespace
  if (settings.ns) {
    classes = classes.map(className => settings.ns + className);
  }

  // Resolve class name from classMap
  if (settings.classMap) {
    const {classMap} = settings;
    classes = classes.map(className => classMap[className] || className);
  }

  return classes.join(' ');
};

function bemBlock(
  settings: BemSettings,
  {name}: Pick<BemContext, 'name'>,
  ...args: [string | BemMods, BemMods?] | []
): string {
  // Is case of call without arguments return string representation
  if (!args.length) {
    return toString(settings, {name});
  }

  const [nameOrMods, mods] = args;

  return toString(settings, {
    name: isString(nameOrMods) && nameOrMods ? name + settings.el + nameOrMods : name,
    mods: isString(nameOrMods) ? mods : nameOrMods,
  });
}

export const setup =
  (settings: Partial<BemSettings> = {}) =>
  (blockName: string) => {
    if (!blockName || !(blockName = blockName.trim())) {
      throw new Error(ERROR_BLOCK_NAME_EMPTY);
    }

    return bemBlock.bind(null, {...defaultSettings, ...settings}, {name: blockName}) as BemBlock;
  };
export const block = setup();

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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function b(...args: any[]) {
  const [bemBlock, ...rest] = args;

  return bemBlock(...rest);
}
