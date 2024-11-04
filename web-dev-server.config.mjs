import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  rootDir: '.',
  watch: true,
  open: true,
  nodeResolve: true,
  appIndex: 'index.html',
  preserveSymlinks: true,
  plugins: [esbuildPlugin({ ts: true })],
};
