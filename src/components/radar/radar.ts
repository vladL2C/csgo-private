import { writeMemory } from 'memoryjs';

import { Entity } from '../../enums/entity';
import { entity } from '../../utils/memory';
import { client } from '../../utils/process';

export const radar = () => {
  let i: number;
  for (i = 0; i < 30; i += 1) {
    const player = entity.getEntityPlayer(i);
    const isDormant = entity.getEntityIsDormant(i);
    if (!isDormant) {
      writeMemory(client.processHandle, player + Entity.Spotted, true, 'int');
    }
  }
};
