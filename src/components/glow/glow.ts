import { writeMemory } from 'memoryjs';

import * as config from '../../configs/config.json';
import { IEntity } from '../../models/entity.model';
import { LocalPlayerState } from '../../utils/entityLoop';
import { GlowObjectManager } from '../../utils/memory';
import { client } from '../../utils/process';

const glowPlayer = (
  playerIndex: number,
  color: any,
  bRenderWhenOccluded: boolean = true,
  bRenderWhenUnoccluded: boolean,
  bFullBloom: boolean
) => {
  const glowObjectManager = GlowObjectManager();
  writeMemory(client.processHandle, glowObjectManager + (playerIndex * 0x38 + 0x4), color.r / 255, 'float');
  writeMemory(client.processHandle, glowObjectManager + (playerIndex * 0x38 + 0x8), color.g / 255, 'float');
  writeMemory(client.processHandle, glowObjectManager + (playerIndex * 0x38 + 0xc), color.b / 255, 'float');
  writeMemory(client.processHandle, glowObjectManager + (playerIndex * 0x38 + 0x10), color.a / 255, 'float');
  writeMemory(client.processHandle, glowObjectManager + (playerIndex * 0x38 + 0x24), bRenderWhenOccluded, 'bool');
  writeMemory(client.processHandle, glowObjectManager + (playerIndex * 0x38 + 0x25), bRenderWhenUnoccluded, 'bool');
  writeMemory(client.processHandle, glowObjectManager + (playerIndex * 0x38 + 0x26), bFullBloom, 'bool');
};

export const glow = (entity: IEntity): void => {
  const myCurrentTeam = LocalPlayerState.team;
  const { playerGlowIndex, isDormant } = entity;
  const entityTeam = entity.team;
  const entityHealth = entity.health;

  if (!isDormant && entityHealth > 0) {
    if (myCurrentTeam === entityTeam && config.glowEsp.teamEnabled) {
      setTimeout(() => glowPlayer(playerGlowIndex, config.glowEsp.team, true, false, config.glowEsp.bloom));
    }

    if (myCurrentTeam !== entityTeam && config.glowEsp.enemyEnabled) {
      setTimeout(() => glowPlayer(playerGlowIndex, config.glowEsp.enemy, true, false, config.glowEsp.bloom));
    }
  }
};
