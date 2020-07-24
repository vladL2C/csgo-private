import { readMemory } from 'memoryjs';

import { Entity } from '../enums/entity';
import { Player } from '../enums/local';
import { client } from './process';

// localPlayer = baseClient + the offset of localplayer to get the current localPlayer
// (baseClient + offset) gives you the correct address
export const localPlayer = {
  getLocalPlayer: () => readMemory(client.processHandle, client.baseClient + Player.LocalPlayer, 'int'),
  getLocalPlayerTeam() {
    return readMemory(client.processHandle, this.getLocalPlayer() + Entity.Team, 'int');
  },
  // returns memory address of whatever player is in crosshair
  // current localplayer + crosshairId offset to find your personal crosshair then it returns the id
  getPlayerInCrosshair() {
    return readMemory(client.processHandle, this.getLocalPlayer() + Player.CrossHairId, 'int');
  },
  isPlayerInCrosshair() {
    const playerCrosshairId = this.getPlayerInCrosshair();
    return playerCrosshairId > 0 && playerCrosshairId < 65;
  },
  actionAttack() {
    return client.baseClient + Player.ForceAttack;
  },
};

// other player helpers
export const entity = {
  getEntityPlayer: (id: number) =>
    readMemory(client.processHandle, client.baseClient + Entity.PlayerList + id * Entity.LoopDistance, 'int'),
  getEntityPlayerHealth(basePlayerAddress: number) {
    return readMemory(client.processHandle, basePlayerAddress + Player.Health, 'int');
  },
  getEntityPlayerTeam(basePlayerAddress: number) {
    return readMemory(client.processHandle, basePlayerAddress + Entity.Team, 'int');
  },
  getEntityIsDormant(basePlayerAddress: number) {
    return readMemory(client.processHandle, basePlayerAddress + Entity.Dormant, 'int');
  },
  getEntityGlowIndex(basePlayerAddress: number) {
    return readMemory(client.processHandle, basePlayerAddress + Entity.GlowIndex, 'int');
  },
};

export const GlowObjectManager = () =>
  readMemory(client.processHandle, client.baseClient + Entity.GlowObjectManager, 'int');
