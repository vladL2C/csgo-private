import {openProcess, findModule, readMemory} from 'memoryjs';

const processName = 'csgo.exe';
const currentOpenProcess = openProcess(processName);
const clientModule = findModule(
  'client_panorama.dll',
  currentOpenProcess.th32ProcessID
);

interface BaseClient {
  baseClient: number;
  processHandle: number;
}

export const client: BaseClient = {
  baseClient: clientModule.modBaseAddr,
  processHandle: currentOpenProcess.handle,
};
