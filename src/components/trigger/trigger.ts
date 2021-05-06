import * as aks from 'asynckeystate';
import { writeMemory } from 'memoryjs';
import * as robot from 'robotjs';

import { EntityState, LocalPlayerState } from '../../utils/entityLoop';
import { localPlayer } from '../../utils/memory';
import { client } from '../../utils/process';

export const triggerBot = (): void => {
  // my current team
  const myCurrentTeam = LocalPlayerState.team;

  // get the current player in crosshair
  const playerInCrosshairId = LocalPlayerState.crosshairId;

  const isPlayerInCrosshair = playerInCrosshairId > 0 && playerInCrosshairId < 65;

  // get the other team player details
  const entityHealth = EntityState[playerInCrosshairId] ? EntityState[playerInCrosshairId].health : 0;
  const entityTeam = EntityState[playerInCrosshairId] ? EntityState[playerInCrosshairId].team : 0;

  // mouse 4 on the side of mouse :)
  // entityTeam 1 = spectator // 2 = T // 3 = CT I THINK don't remember
  if (aks.getAsyncKeyState(0x05)) {
    if (isPlayerInCrosshair && myCurrentTeam !== entityTeam && entityTeam > 1 && entityHealth > 0) {
      robot.mouseClick();
    }
  }
};
