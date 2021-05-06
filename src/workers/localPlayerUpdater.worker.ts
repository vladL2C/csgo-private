import { localPlayer } from '../utils/memory';

interface ILocalPlayer {
  base: number;
  team: number;
  crosshairId: number;
  jumpState: number;
}

export const LocalPlayerState: ILocalPlayer = {
  base: 0,
  team: 0,
  crosshairId: 0,
  jumpState: 0,
};

setInterval(() => {
  LocalPlayerState.base = localPlayer.getLocalPlayer();
  LocalPlayerState.team = localPlayer.getLocalPlayerTeam(LocalPlayerState.base);
  LocalPlayerState.crosshairId = localPlayer.getPlayerInCrosshair(LocalPlayerState.base) - 1;
  LocalPlayerState.jumpState = localPlayer.getLocalPlayerJumpState(LocalPlayerState.base);
}, 0);
