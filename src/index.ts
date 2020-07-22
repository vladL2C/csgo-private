import * as config from '../config.json';
import { glow } from './components/glow/glow';
import { radar } from './components/radar/radar';
import { triggerBot } from './components/trigger/trigger';
import { IEntity } from './models/entity.model';
import { entityLoop } from './utils/entityLoop';
import { getOffsets } from './utils/getoffSets';
import { initialise } from './utils/process';

const { triggerbot, radarMinimap, glowEsp, manualUpdateOffsets } = config;

const runVL2C = () => {
  Promise.all([getOffsets(manualUpdateOffsets), initialise()])
    .then(([first, second]) => {
      console.log(first);
      console.log(second);
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
    })
    .catch(e => console.log(e));
};

runVL2C();
