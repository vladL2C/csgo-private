import { IEntity } from '../models/entity.model';
import { entity, localPlayer } from './memory';

export const EntityState: IEntity[] = [];
export const LocalPlayerState: any = {};

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

export const LocalPlayerUpdater = () =>
  setInterval(() => {
    LocalPlayerState.base = localPlayer.getLocalPlayer();
    LocalPlayerState.team = localPlayer.getLocalPlayerTeam(LocalPlayerState.base);
    LocalPlayerState.crosshairId = localPlayer.getPlayerInCrosshair(LocalPlayerState.base) - 1;
  }, 0);

export const entityLoop = (callbackFn: (entity: IEntity) => void) => {
  EntityState.forEach(callbackFn);
};
