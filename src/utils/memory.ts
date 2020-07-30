import { readMemory } from 'memoryjs';

import { Entity } from '../enums/entity';
import { Player } from '../enums/local';
import { client } from './process';

export const localPlayer = {
  getLocalPlayer: () => readMemory(client.processHandle, client.baseClient + Player.LocalPlayer, 'int'),
  getLocalPlayerTeam(basePlayerAddress: number) {
    return readMemory(client.processHandle, basePlayerAddress + Entity.Team, 'int');
  },
  getPlayerInCrosshair(basePlayerAddress: number) {
    return readMemory(client.processHandle, basePlayerAddress + Player.CrossHairId, 'int');
  },
  actionAttack() {
    return client.baseClient + Player.ForceAttack;
  },
  actionJump() {
    return client.baseClient + Player.ForceJump;
  },
  getLocalPlayerJumpState(basePlayerAddress: number) {
    return readMemory(client.processHandle, basePlayerAddress + Player.JumpFlag, 'int');
  },
};
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
