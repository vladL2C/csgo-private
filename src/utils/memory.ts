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
  getEntityPlayerHealth(id: number) {
    return readMemory(client.processHandle, this.getEntityPlayer(id) + Player.Health, 'int');
  },
  getEntityPlayerTeam(id: number) {
    return readMemory(client.processHandle, this.getEntityPlayer(id) + Entity.Team, 'int');
  },
  getEntityIsDormant(id: number) {
    return readMemory(client.processHandle, this.getEntityPlayer(id) + Entity.Dormant, 'int');
  },
  getEntityGlowIndex(id: number) {
    return readMemory(client.processHandle, this.getEntityPlayer(id) + Entity.GlowIndex, 'int');
  },
};

const GlowObjectManager: any = function GlowObjectManager(this: any) {
  this.glowManager = 0;
};

GlowObjectManager.prototype.getGlowManager = function getGlowManager() {
  if (this.glowManager) {
    console.log('hoe haha');
    return this.glowManager;
  }
  console.log('hoe hoe');
  this.glowManager = readMemory(client.processHandle, client.baseClient + Entity.GlowObjectManager, 'int');
  return this.glowManager;
};

export const GlowManagerInstance = new GlowObjectManager();
