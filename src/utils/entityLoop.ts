import { IEntity } from '../models/entity.model';
import { entity } from './memory';

export const EntityState: IEntity[] = [];

export const EntityUpdater = () =>
  setInterval(() => {
    for (let i = 0; i < 64; i += 1) {
      const playerBase = entity.getEntityPlayer(i);
      const entityTeam = entity.getEntityPlayerTeam(playerBase);
      const isDormant = entity.getEntityIsDormant(playerBase);
      const playerGlowIndex = entity.getEntityGlowIndex(playerBase);
      const entityHealth = entity.getEntityPlayerHealth(playerBase);

      if (playerBase) {
        EntityState[i] = {
          entityPlayer: playerBase,
          team: entityTeam,
          isDormant,
          playerGlowIndex,
          health: entityHealth,
        };
      }
    }
  }, 250);

export const entityLoop = (callbackFn: (entity: IEntity) => void) => {
  EntityState.forEach(callbackFn);
};
