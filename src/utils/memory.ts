import {client} from './process';
import {Player} from '../enums/local';
import {readMemory} from 'memoryjs';
import {Entity} from '../enums/entity';

//localPlayer = baseClient + the offset of localplayer to get the current localPlayer
// (baseClient + offset) gives you the correct address
export const localPlayer = {
  getLocalPlayer: () =>
    readMemory(
      client.processHandle,
      client.baseClient + Player.LocalPlayer,
      'int'
    ),
  getLocalPlayerTeam: function () {
    return readMemory(
      client.processHandle,
      localPlayer.getLocalPlayer() + Entity.Team,
      'int'
    );
  },
  getPlayerInCrosshair: function () {
    return readMemory(
      client.processHandle,
      localPlayer.getLocalPlayer() + Player.CrossHairId,
      'int'
    );
  },
  isPlayerInCrosshair: function () {
    const playerCrosshairId = localPlayer.getPlayerInCrosshair();
    return playerCrosshairId > 0 && playerCrosshairId < 65;
  },
  actionAttack: function () {
    return client.baseClient + Player.ForceAttack;
  },
};

// other player helpers
export const entity = {
  getEntityPlayer: (id: number) =>
    readMemory(
      client.processHandle,
      client.baseClient + Entity.PlayerList + id * 0x10,
      'int'
    ),
  getEntityPlayerHealth: function (id: number) {
    return readMemory(
      client.processHandle,
      entity.getEntityPlayer(id) + Player.Health,
      'int'
    );
  },
  getEntityPlayerTeam: function (id: number) {
    return readMemory(
      client.processHandle,
      entity.getEntityPlayer(id) + Entity.Team,
      'int'
    );
  },
};
