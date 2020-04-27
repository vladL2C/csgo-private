import * as offsets from '../../offsets.json';

const {signatures, netvars} = offsets;

// offsets
export enum Player {
  LocalPlayer = signatures.dwLocalPlayer,
  ForceAttack = signatures.dwForceAttack,
  CrossHairId = netvars.m_iCrosshairId,
  Health = netvars.m_iHealth,
}
