import { writeMemory } from 'memoryjs';
import * as aks from 'asynckeystate';
import { LocalPlayerState } from '../../utils/entityLoop';
import { client } from '../../utils/process' ;
import { localPlayer } from '../../utils/memory' ;

export const jumpBot = (): void => {
 if (aks.getAsyncKeyState(0x20) && LocalPlayerState.jumpState === 257) {
     // import client and localPlayer
   writeMemory(client.processHandle, localPlayer.actionJump(), 5, 'int');  
   setTimeout(() => writeMemory(client.processHandle, localPlayer.actionJump(), 4, 'int'));
 }
}