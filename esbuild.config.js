const { build } = require('esbuild');

const { nodeExternalsPlugin } = require('esbuild-node-externals');

build({
  entryPoints: ['./src/index.ts'],
  outfile: 'parser.js',
  bundle: true,
  minify: true,
  platform: 'node',
  target: 'esnext',
  plugins: [nodeExternalsPlugin()]
}).catch(() => process.exit(1))