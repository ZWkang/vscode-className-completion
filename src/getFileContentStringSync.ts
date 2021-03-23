import * as fs from 'fs';

function getFileContentStringSync(fileName: string, opts: any = {}) {
  const { decode = 'utf-8' } = opts;
  if (!fs.existsSync(fileName)) {
    return '';
  }
  return fs.readFileSync(fileName, opts).toString(decode);
}

export default getFileContentStringSync;
