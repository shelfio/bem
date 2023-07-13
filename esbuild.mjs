import {common} from '@shelf/esbuild-config';

await Promise.all(
  ['esm', 'cjs'].map(
    async format =>
      await common({
        entryPoints: ['src/index.ts'],
        config: {
          splitting: false,
          format,
          packages: undefined,
          entryNames: format === 'esm' ? '[name].esm' : '[name]',
        },
      })
  )
);

process.exit(0);
