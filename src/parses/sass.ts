import * as sass from 'sass';
import { exists } from '../util';

async function sassParse(filePath: string) {
  const exist = await exists(filePath);
  if (!exist) return;
  return new Promise((resolve, reject) => {
    sass.render(
      {
        file: filePath
      },
      (err, result) => {
        console.log();
        if (err) reject(err);
        resolve(result?.css?.toString('utf-8'));
      }
    );
  });
}

export default sassParse;
