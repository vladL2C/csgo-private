/* eslint-disable import/no-dynamic-require */
const path = require('path');

require('ts-node').register();

require(path.resolve(__dirname, './localPlayerUpdater.worker.ts'));
