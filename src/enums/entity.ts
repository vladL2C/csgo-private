import * as offsets from '../../offsets.json';

const { signatures, netvars } = offsets;

export enum Entity {
  PlayerList = signatures.dwEntityList,
  LoopDistance = 0x10,
  Team = netvars.m_iTeamNum,
  Dormant = signatures.m_bDormant,
  Spotted = netvars.m_bSpotted,
  GlowObjectManager = signatures.dwGlowObjectManager,
  GlowIndex = netvars.m_iGlowIndex,
}
