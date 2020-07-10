import * as config from '../config.json';
import { glow } from './components/glow/glow';
import { radar } from './components/radar/radar';
import { triggerBot } from './components/trigger/trigger';
import { getOffsets } from './utils/getoffSets';

const { triggerbot, radarMinimap, glowEsp, manualUpdateOffsets } = config;

getOffsets(manualUpdateOffsets).then(() => {
  // this seems to be perfectly fine for memory and cpu usage
  // we need setInterval to keep this running
  setInterval(() => {
    if (triggerbot.enabled) {
      triggerBot();
    }
    if (radarMinimap.enabled) {
      radar();
    }

    if (glowEsp.enemyEnabled || glowEsp.teamEnabled) {
      glow();
    }
  }, 1);
});
