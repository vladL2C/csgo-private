import { writeMemory } from 'memoryjs';

import { Entity } from '../../enums/entity';
import { entity, localPlayer } from '../../utils/memory';
import { client } from '../../utils/process';

export const radar = () => {
  let i: number;
  for (i = 0; i < 30; i += 1) {
    const player = entity.getEntityPlayer(i);
    const myCurrentTeam = localPlayer.getLocalPlayerTeam();
    const entityTeam = entity.getEntityPlayerTeam(i);
    const isDormant = entity.getEntityIsDormant(i);
    if (!isDormant && myCurrentTeam !== entityTeam) {
      writeMemory(client.processHandle, player + Entity.Spotted, true, 'boolean');
    }
  }
};
