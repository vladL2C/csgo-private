import { glow } from './components/glow/glow';
import { jumpBot } from './components/jump/jump';
import { radar } from './components/radar/radar';
import { triggerBot } from './components/trigger/trigger';
import * as config from './configs/config.json';
import { IEntity } from './models/entity.model';
import { entityLoop, EntityUpdater, LocalPlayerUpdater } from './utils/entityLoop';
import { getOffsets } from './utils/getoffSets';
import { initialise } from './utils/process';

const { triggerbot, radarMinimap, glowEsp, manualUpdateOffsets, bhop } = config;

export const runVL2C = () => {
  Promise.all([getOffsets(manualUpdateOffsets), initialise()])
    .then(([first, second]) => {
      console.log('\x1b[32m', first);
      console.log('\x1b[32m', second);

      LocalPlayerUpdater();
      EntityUpdater();

      setInterval(() => {
        if (triggerbot.enabled) {
          triggerBot();
        }
      }, 0);

      setInterval(() => {
        if (bhop.enabled) {
          jumpBot();
        }
      }, 0);

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
    })
    .catch(() => {
      console.log('\x1b[31m', '...Game not running...');
      runVL2C();
      console.clear();
    });
};

runVL2C();
