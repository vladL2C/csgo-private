import { findModule, openProcess } from 'memoryjs';

const baseClient: number = 0;
const processHandle: number = 0;

const processName = 'csgo.exe';

interface BaseClient {
  baseClient: number;
  processHandle: number;
}

export const client: BaseClient = {
  baseClient,
  processHandle,
};

export const initialise = () => {
  return new Promise((resolve, reject) => {
    openProcess(processName, (err, process) => {
      if (err) {
        reject(new Error('Game not found'));
      } else {
        client.baseClient = findModule('client.dll', process.th32ProcessID).modBaseAddr;
        client.processHandle = process.handle;
        resolve('Successfully Loaded VL2C');
      }
    });
  });
};
