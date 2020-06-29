import * as aks from 'asynckeystate';
import { writeMemory } from 'memoryjs';

import { entity, localPlayer } from '../../utils/memory';
import { client } from '../../utils/process';

export const triggerBot = (): void => {
  // my current team
  const myCurrentTeam = localPlayer.getLocalPlayerTeam();

  // get the current player in crosshair
  const playerInCrosshairId = localPlayer.getPlayerInCrosshair() - 1;

  // get the other team player details
  const entityHealth = entity.getEntityPlayerHealth(playerInCrosshairId);
  const entityTeam = entity.getEntityPlayerTeam(playerInCrosshairId);

  // mouse 4 on the side of mouse :)
  // entityTeam 1 = spectator // 2 = T // 3 = CT I THINK don't remember
  if (aks.getAsyncKeyState(0x05)) {
    if (localPlayer.isPlayerInCrosshair() && myCurrentTeam !== entityTeam && entityTeam > 1 && entityHealth > 0) {
      writeMemory(client.processHandle, localPlayer.actionAttack(), 1, 'int');
      setTimeout(() => writeMemory(client.processHandle, localPlayer.actionAttack(), 4, 'int'));
    }
  }
};
