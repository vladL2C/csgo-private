import { glow } from './components/glow/glow';
import { radar } from './components/radar/radar';
import { triggerBot } from './components/trigger/trigger';
import * as config from './configs/config.json';
import { IEntity } from './models/entity.model';
import { entityLoop, EntityUpdater, LocalPlayerUpdater } from './utils/entityLoop';
import { getOffsets } from './utils/getoffSets';
import { initialise } from './utils/process';
import { jumpBot} from './components/jump/jump';
const { triggerbot, radarMinimap, glowEsp, manualUpdateOffsets } = config;

const runVL2C = () => {
  Promise.all([getOffsets(manualUpdateOffsets), initialise()])
    .then(([first, second]) => {
      console.log('\x1b[32m', first);
      console.log('\x1b[32m', second);

      LocalPlayerUpdater();
      EntityUpdater();

      // same as this 
      setInterval(() => {
        if (triggerbot.enabled) {
          triggerBot();
        }
      }, 0);
      // its ready see if it runs
      setInterval(() => {
        jumpBot();
      },0)

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
