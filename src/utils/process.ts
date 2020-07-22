import { findModule, openProcess, readMemory } from 'memoryjs';

import { Entity } from '../enums/entity';

let baseClient: number = 0;
let processHandle: number = 0;
let glowObjectManager: number = 0;

const processName = 'csgo.exe';

export const initialise = () => {
  return new Promise((resolve, reject) => {
    openProcess(processName, (err, process) => {
      if (err) {
        reject(new Error('Game not found'));
      } else {
        baseClient = findModule('client.dll', process.th32ProcessID).modBaseAddr;
        processHandle = process.handle;
        glowObjectManager = readMemory(process.handle, baseClient + Entity.GlowObjectManager, 'int');
        resolve('Successfully Loaded VL2C');
      }
    });
  });
};

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
