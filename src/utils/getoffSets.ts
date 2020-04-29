import { writeFile } from 'fs';
import request from 'request';

export const getOffsets = () => {
  return new Promise((resolve, reject) => {
    request(
      {
        url: 'https://raw.githubusercontent.com/frk1/hazedumper/master/csgo.json',
        json: true,
      },
      (err, _res, body) => {
        if (err) return;
        writeFile('./offsets.json', JSON.stringify(body, null, 2), error => {
          if (error) {
            reject(err);
          } else {
            resolve('Successfully downloaded offsets');
          }
        });
      }
    );
  });
};
