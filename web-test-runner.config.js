import { vitePlugin } from '@remcovaes/web-test-runner-vite-plugin';

export default {
  nodeResolve: true,
  plugins: [vitePlugin()],
  files: ['src/tests/**/*.test.ts'],

  testFramework: {
    config: {
      ui: 'bdd',
      timeout: '2000',
    },
  },

  coverageConfig: {
    include: ['src/**/*'],
    exclude: ['src/tests/**/*', '**/node_modules/**/*', '**/localization/**/*'],
  },
};
