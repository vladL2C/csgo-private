import {localPlayer, entity} from '../../utils/memory';
import {writeMemory} from 'memoryjs';
import {client} from '../../utils/process';
import * as aks from 'asynckeystate';

export const triggerBot = () => {
  //my current team
  const myCurrentTeam = localPlayer.getLocalPlayerTeam();

  // get the current player in crosshair
  const playerInCrosshairId = localPlayer.getPlayerInCrosshair() - 1;

  // get the other team player details
  const entityHealth = entity.getEntityPlayerHealth(playerInCrosshairId);
  const entityTeam = entity.getEntityPlayerTeam(playerInCrosshairId);

  //mouse 4 on the side of mouse :)
  if (aks.getAsyncKeyState(0x05)) {
    if (
      localPlayer.isPlayerInCrosshair() &&
      myCurrentTeam !== entityTeam &&
      entityTeam > 1 &&
      entityHealth > 0
    ) {
      writeMemory(client.processHandle, localPlayer.actionAttack(), 1, 'int');

      setTimeout(() => {
        writeMemory(client.processHandle, localPlayer.actionAttack(), 4, 'int');
      }, 1);
    }
  }
};

