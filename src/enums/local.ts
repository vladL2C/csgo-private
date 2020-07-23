import * as offsets from '../configs/offsets.json';

const { signatures, netvars } = offsets;

// offsets
export enum Player {
  LocalPlayer = signatures.dwLocalPlayer,
  ClientState = signatures.dwClientState,
  ForceAttack = signatures.dwForceAttack,
  CrossHairId = netvars.m_iCrosshairId,
  Health = netvars.m_iHealth,
}
