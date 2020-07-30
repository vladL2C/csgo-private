import {writeMemory} from 'memoryjs';
import * as aks from 'asynckeystate';
import { EntityState, LocalPlayerState } from '../../utils/entityLoop';


// we dont have actionJump
// you havn't imported client 
// you need to create localPlayer.actionJump in memory we only have actionAttack.


// also need to find out if player is on ground or not from the LocalPlayerState.jumpFlag otherwise this will constantly just forceJump
// check mem

export const jumpBot = (): void => {
    console.clear();
    console.log(LocalPlayerState.jumpState);// localplayer jump state inside
}