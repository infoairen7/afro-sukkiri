// Local verification build with esbuild (used where the npm registry is unreachable).
// The official build is `npm run build` (Vite). Output layout matches: dist/index.html + dist/bundle/* + public files.
import { build } from '/opt/npm-tools/node_modules/esbuild/lib/main.js';
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = resolve(root, process.argv[2] ?? 'dist');
rmSync(out, { recursive: true, force: true });
mkdirSync(resolve(out, 'bundle'), { recursive: true });
cpSync(resolve(root, 'public'), out, { recursive: true });
await build({
  entryPoints: [resolve(root, 'src/main.ts')],
  bundle: true, format: 'esm', target: 'es2022', minify: true, sourcemap: false,
  outdir: resolve(out, 'bundle'), entryNames: 'main', legalComments: 'linked',
  nodePaths: [resolve(root, 'node_modules')], logLevel: 'warning',
});
let html = readFileSync(resolve(root, 'index.html'), 'utf8');
html = html.replace('<script type="module" src="/src/main.ts"></script>', '<link rel="stylesheet" href="./bundle/main.css" />\n  <script type="module" src="./bundle/main.js"></script>');
writeFileSync(resolve(out, 'index.html'), html);
console.log('built', out);
