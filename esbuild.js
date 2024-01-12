#! node
require('esbuild')
  .build({
    logLevel: 'info',
    platform: 'node',
    entryPoints: ['src/server.ts'],
    bundle: true,
    outfile: 'build/server.js',
    loader: {
      '.html': 'text',
    },
    minify: true,
    minifyWhitespace: true,
  })
  .catch(() => process.exit(1));
