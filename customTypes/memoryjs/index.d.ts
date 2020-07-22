declare interface ProcessListEntry {
  cntThreads: number;
  szExeFile: string;
  th32ProcessID: number;
  th32ParentProcessID: number;
  pcPriClassBase: number;
}

declare interface ModuleListEntry {
  modBaseAddr: number;
  modBaseSize: number;
  szExePath: string;
  szModule: string;
  th32ProcessID: number;
  hModule: number;
}

declare interface ModuleObject {
  modBaseAddr: number;
  modBaseSize: number;
  szExePath: string;
  szModule: string;
  th32ModuleID: number;
}

declare interface ProcessObject {
  dwSize: number;
  th32ProcessID: number;
  cntThreads: number;
  th32ParentProcessID: number;
  pcPriClassBase: number;
  szExeFile: string;
  handle: number;
  modBaseAddr: number;
}

declare type EMemoryTypes = any;
declare type MemoryTypes =
  | 'byte'
  | 'int'
  | 'int32'
  | 'uint32'
  | 'int64'
  | 'uint64'
  | 'dword'
  | 'short'
  | 'long'
  | 'float'
  | 'double'
  | 'bool'
  | 'boolean'
  | 'ptr'
  | 'pointer'
  | 'str'
  | 'string'
  | 'vec3'
  | 'vector3'
  | 'vec4'
  | 'vector4';

/*
processObject =>
{ dwSize: 304,
  th32ProcessID: 16452,
  cntThreads: 3,
  th32ParentProcessID: 2412,
  pcPriClassBase: 8,
  szExeFile: 'notepad.exe',
  handle: 520,
  modBaseAddr: 3734306816 }
 */
declare module 'memoryjs' {
  export function openProcess(
    processIdentifier: string,
    callback: (error: any, processObject: ProcessObject) => void
  ): void;
  export function openProcess(processIdentifier: string): ProcessObject;

  export function getProcesses(callback: (error: any, processes: ProcessListEntry[]) => void): void;
  export function getProcesses(): ProcessListEntry[];

  export function findModule(moduleName: string, pid: number): ModuleListEntry;

  export function getModules(pid: number): ModuleObject[];

  export function readMemory(handle: number, address: any, dataType: EMemoryTypes): any;

  export function writeMemory(handle: number, address: any, value: any, dataType: EMemoryTypes): any;

  export function readBuffer(handle: number, address: any, size: number): any;

  export function writeBuffer(handle: number, address: any, buffer: any): any;
}
