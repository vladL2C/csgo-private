import { findModule, openProcess, readMemory } from 'memoryjs';

import { Entity } from '../enums/entity';

const processName = 'csgo.exe';
const currentOpenProcess = openProcess(processName);
const clientModule = findModule('client.dll', currentOpenProcess.th32ProcessID);

interface BaseClient {
  baseClient: number;
  processHandle: number;
  glowObjectManager: number;
}

export const client: BaseClient = {
  baseClient: clientModule.modBaseAddr,
  processHandle: currentOpenProcess.handle,
  glowObjectManager: readMemory(currentOpenProcess.handle, clientModule.modBaseAddr + Entity.GlowObjectManager, 'int'),
};
