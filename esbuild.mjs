import {common} from '@shelf/esbuild-config';

await Promise.all(
  ['esm', 'cjs'].map(
    async format =>
      await common({
        entryPoints: ['src/index.ts'],
        config: {
          splitting: false,
          format,
          packages: format === 'esm' ? 'external' : undefined,
          entryNames: format === 'esm' ? '[name].es' : '[name]',
        },
      })
  )
);

process.exit(0);
