import { writeMemory } from 'memoryjs';

import { Entity } from '../../enums/entity';
import { IEntity } from '../../models/entity.model';
import { client } from '../../utils/process';
import { LocalPlayerState } from '../../workers/localPlayerUpdater.worker';

export const radar = (entity: IEntity): void => {
  const myCurrentTeam = LocalPlayerState.team;
  const player = entity.entityPlayer;
  const entityTeam = entity.team;
  const { isDormant } = entity;
  if (!isDormant && myCurrentTeam !== entityTeam && entityTeam > 1) {
    writeMemory(client.processHandle, player + Entity.Spotted, true, 'boolean');
  }
};
