import { writeMemory } from 'memoryjs';

import { Entity } from '../../enums/entity';
import { IEntity } from '../../models/entity.model';
import { localPlayer } from '../../utils/memory';
import { client } from '../../utils/process';

export const radar = (entity: IEntity): void => {
  const localPlayerBase = localPlayer.getLocalPlayer();
  const myCurrentTeam = localPlayer.getLocalPlayerTeam(localPlayerBase);
  const player = entity.entityPlayer;
  const entityTeam = entity.team;
  const { isDormant } = entity;
  if (!isDormant && myCurrentTeam !== entityTeam && entityTeam > 1) {
    writeMemory(client.processHandle, player + Entity.Spotted, true, 'boolean');
  }
};
