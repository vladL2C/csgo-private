import * as config from '../config.json';
import { glow } from './components/glow/glow';
import { radar } from './components/radar/radar';
import { triggerBot } from './components/trigger/trigger';
import { IEntity } from './models/entity.model';
import { entityLoop } from './utils/entityLoop';
import { getOffsets } from './utils/getoffSets';

const { triggerbot, radarMinimap, glowEsp, manualUpdateOffsets } = config;

getOffsets(manualUpdateOffsets).then(() => {
  // this seems to be perfectly fine for memory and cpu usage
  // we need setInterval to keep this running
  setInterval(() => {
    if (triggerbot.enabled) {
      triggerBot();
    }
  }, 1);

  setInterval(() => {
    entityLoop((entity: IEntity) => {
      if (radarMinimap.enabled) {
        radar(entity);
      }

      if (glowEsp.enemyEnabled || glowEsp.teamEnabled) {
        glow(entity);
      }
    });
  }, 25);
});
