import feTsRules from '@shelf/eslint-config/frontend-typescript-no-prettier.js';

export default [
  ...feTsRules,
  {
    ignores: ['**/coverage/', '**/lib/', 'renovate.json', 'tsconfig.json'],
  },
  {
    rules: {
      'sonarjs/no-nested-assignment': 'off',
    },
  },
];
