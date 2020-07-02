import { writeMemory } from 'memoryjs';

import * as config from '../../../config.json';
import { entity, getGlowObjectManager, localPlayer } from '../../utils/memory';
import { client } from '../../utils/process';

const glowPlayer = (
  playerIndex: number,
  color: any,
  bRenderWhenOccluded: boolean,
  bRenderWhenUnoccluded: boolean,
  bFullBloom: boolean
) => {
  const glowObjectManager = getGlowObjectManager();
  writeMemory(client.processHandle, glowObjectManager + (playerIndex * 0x38 + 0x4), color.r / 255, 'float');
  writeMemory(client.processHandle, glowObjectManager + (playerIndex * 0x38 + 0x8), color.g / 255, 'float');
  writeMemory(client.processHandle, glowObjectManager + (playerIndex * 0x38 + 0xc), color.b / 255, 'float');
  writeMemory(client.processHandle, glowObjectManager + (playerIndex * 0x38 + 0x10), color.a / 255, 'float');
  writeMemory(client.processHandle, glowObjectManager + (playerIndex * 0x38 + 0x24), bRenderWhenOccluded, 'bool');
  writeMemory(client.processHandle, glowObjectManager + (playerIndex * 0x38 + 0x25), bRenderWhenUnoccluded, 'bool');
  writeMemory(client.processHandle, glowObjectManager + (playerIndex * 0x38 + 0x26), bFullBloom, 'bool');
};

export const glow = (): void => {
  let i: number;
  for (i = 0; i < 64; i += 1) {
    const playerGlowIndex = entity.getEntityGlowIndex(i);

    const myCurrentTeam = localPlayer.getLocalPlayerTeam();
    const entityTeam = entity.getEntityPlayerTeam(i);
    const isDormant = entity.getEntityIsDormant(i);
    const entityHealth = entity.getEntityPlayerHealth(i);

    if (!isDormant && entityHealth > 0) {
      if (myCurrentTeam === entityTeam && config.glowEsp.teamEnabled) {
        glowPlayer(playerGlowIndex, config.glowEsp.team, true, false, config.glowEsp.bloom);
      }

      if (myCurrentTeam !== entityTeam && config.glowEsp.enemyEnabled) {
        glowPlayer(playerGlowIndex, config.glowEsp.enemy, true, false, config.glowEsp.bloom);
      }
    }
  }
};
