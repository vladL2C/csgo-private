import { findModule, openProcess, readMemory } from 'memoryjs';

import { Entity } from '../enums/entity';

const baseClient: number = 0;
const processHandle: number = 0;
const glowObjectManager: number = 0;

const processName = 'csgo.exe';

interface BaseClient {
  baseClient: number;
  processHandle: number;
  glowObjectManager: number;
}

export const client: BaseClient = {
  baseClient,
  processHandle,
  glowObjectManager,
};

export const initialise = () => {
  return new Promise((resolve, reject) => {
    openProcess(processName, (err, process) => {
      if (err) {
        reject(new Error('Game not found'));
      } else {
        client.baseClient = findModule('client.dll', process.th32ProcessID).modBaseAddr;
        client.processHandle = process.handle;
        client.glowObjectManager = readMemory(process.handle, client.baseClient + Entity.GlowObjectManager, 'int');
        resolve('Successfully Loaded VL2C');
      }
    });
  });
};
