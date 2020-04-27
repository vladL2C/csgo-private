import {getOffsets} from './utils/getoffSets';
import {triggerBot} from './components/trigger/trigger';

getOffsets().then(() => {
  // this seems to be perfectly fine for memory and cpu usage
  // we need setInterval to keep this running 
  setInterval(() => {
    triggerBot();
  }, 1);
});
