import * as offsets from '../../offsets.json';

const {signatures, netvars} = offsets;

export enum Entity {
  PlayerList = signatures.dwEntityList,
  LoopDistance = 0x10,
  Team = netvars.m_iTeamNum,
}
