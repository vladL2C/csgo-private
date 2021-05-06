import * as aks from 'asynckeystate';
import { writeMemory } from 'memoryjs';

import { localPlayer } from '../../utils/memory';
import { client } from '../../utils/process';
import { LocalPlayerState } from '../../workers/localPlayerUpdater.worker';

export const jumpBot = (): void => {
  if (aks.getAsyncKeyState(0x20) && LocalPlayerState.jumpState === 257) {
    // import client and localPlayer
    writeMemory(client.processHandle, localPlayer.actionJump(), 5, 'int');
    setTimeout(() => writeMemory(client.processHandle, localPlayer.actionJump(), 4, 'int'));
  }
};
