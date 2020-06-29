import { writeMemory } from 'memoryjs';

import { Entity } from '../../enums/entity';
import { entity, localPlayer } from '../../utils/memory';
import { client } from '../../utils/process';

export const radar = (): void => {
  let i: number;
  for (i = 1; i < 65; i += 1) {
    const player = entity.getEntityPlayer(i);
    const myCurrentTeam = localPlayer.getLocalPlayerTeam();
    const entityTeam = entity.getEntityPlayerTeam(i);
    const isDormant = entity.getEntityIsDormant(i);
    if (!isDormant && myCurrentTeam !== entityTeam && entityTeam > 1) {
      writeMemory(client.processHandle, player + Entity.Spotted, true, 'boolean');
    }
  }
};