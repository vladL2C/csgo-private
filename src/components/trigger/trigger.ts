import * as aks from 'asynckeystate';
import { writeMemory } from 'memoryjs';

import { IEntity } from '../../models/entity.model';
import { localPlayer } from '../../utils/memory';
import { client } from '../../utils/process';

export const triggerBot = (entity: IEntity): void => {
  // my current team
  const baseLocalPlayer = localPlayer.getLocalPlayer();
  const myCurrentTeam = localPlayer.getLocalPlayerTeam(baseLocalPlayer);

  // get the current player in crosshair
  const playerInCrosshairId = localPlayer.getPlayerInCrosshair(baseLocalPlayer) - 1;

  const isPlayerInCrosshair = playerInCrosshairId > 0 && playerInCrosshairId < 65;

  // get the other team player details
  const entityHealth = entity.health;
  const entityTeam = entity.team;

  // mouse 4 on the side of mouse :)
  // entityTeam 1 = spectator // 2 = T // 3 = CT I THINK don't remember
  if (aks.getAsyncKeyState(0x05)) {
    if (isPlayerInCrosshair && myCurrentTeam !== entityTeam && entityTeam > 1 && entityHealth > 0) {
      writeMemory(client.processHandle, localPlayer.actionAttack(), 5, 'int');
      setTimeout(() => writeMemory(client.processHandle, localPlayer.actionAttack(), 4, 'int'));
    }
  }
};
