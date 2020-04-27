import {getOffsets} from './utils/getoffSets';
import {triggerBot} from './components/trigger/trigger';

getOffsets().then(() => {
  setInterval(() => {
    triggerBot();
  }, 1);
});
