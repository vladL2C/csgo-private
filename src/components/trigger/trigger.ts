import {localPlayer, entity} from '../../utils/memory';
import {writeMemory} from 'memoryjs';
import {client} from '../../utils/process';
import * as aks from 'asynckeystate';

export const triggerBot = () => {
  // local and entity helpers
  const {
    isPlayerInCrosshair,
    getPlayerInCrosshair,
    getLocalPlayerTeam,
    actionAttack,
  } = localPlayer;
  const {getEntityPlayerHealth, getEntityPlayerTeam} = entity;

  //my current team
  const myCurrentTeam = getLocalPlayerTeam();

  // get the current player in crosshair
  const playerInCrosshairId = getPlayerInCrosshair() - 1;

  // get the other team player details
  const entityHealth = getEntityPlayerHealth(playerInCrosshairId);
  const entityTeam = getEntityPlayerTeam(playerInCrosshairId);

  if (aks.getAsyncKeyState(0x05)) {
    if (
      isPlayerInCrosshair() &&
      myCurrentTeam !== entityTeam &&
      entityTeam > 1 &&
      entityHealth > 0
    ) {
      writeMemory(client.processHandle, actionAttack(), 1, 'int');

      setTimeout(() => {
        writeMemory(client.processHandle, actionAttack(), 4, 'int');
      }, 1);
    }
  }
};
