import { IEntity } from '../models/entity.model';
import { entity } from './memory';

export const entityLoop = (callbackFn: (entity: IEntity) => void) => {
  for (let i = 0; i < 64; i += 1) {
    const player = entity.getEntityPlayer(i);
    const entityTeam = entity.getEntityPlayerTeam(i);
    const isDormant = entity.getEntityIsDormant(i);
    const playerGlowIndex = entity.getEntityGlowIndex(i);
    const entityHealth = entity.getEntityPlayerHealth(i);

    if (player) {
      callbackFn({
        entityPlayer: player,
        team: entityTeam,
        isDormant,
        playerGlowIndex,
        health: entityHealth,
      });
    }
  }
};
