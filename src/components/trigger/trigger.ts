import * as aks from 'asynckeystate';
import { writeMemory } from 'memoryjs';

import { entity, localPlayer } from '../../utils/memory';
import { client } from '../../utils/process';

export const triggerBot = () => {
  // my current team
  const myCurrentTeam = localPlayer.getLocalPlayerTeam();

  // get the current player in crosshair
  const playerInCrosshairId = localPlayer.getPlayerInCrosshair();

  // get the other team player details
  const entityHealth = entity.getEntityPlayerHealth(playerInCrosshairId);
  const entityTeam = entity.getEntityPlayerTeam(playerInCrosshairId);

  // mouse 4 on the side of mouse :)
  // entityTeam 1 = spectator // 2 = T // 3 = CT I THINK don't remember
  if (aks.getAsyncKeyState(0x05)) {
    if (localPlayer.isPlayerInCrosshair() && myCurrentTeam !== entityTeam && entityTeam > 1 && entityHealth > 0) {
      const randomisedDelay = Math.random() * 25;

      setTimeout(() => {
        writeMemory(client.processHandle, localPlayer.actionAttack(), 1, 'int');
      }, randomisedDelay);

      setTimeout(() => {
        writeMemory(client.processHandle, localPlayer.actionAttack(), 4, 'int');
      }, randomisedDelay + 1);
    }
  }
};
