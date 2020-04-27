import * as request from 'request';
import {writeFile} from 'fs';

export const getOffsets = () => {
  return new Promise((resolve, reject) => {
    request(
      {
        url:
          'https://raw.githubusercontent.com/frk1/hazedumper/master/csgo.json',
        json: true,
      },
      (err, res, body) => {
        if (err) console.log(err);
        writeFile('./offsets.json', JSON.stringify(body, null, 2), err => {
          if (err) {
            reject(err);
          } else {
            resolve('Successfully downloaded offsets');
          }
        });
      }
    );
  });
};
