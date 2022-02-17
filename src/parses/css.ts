import { exists, readFile } from '../util';

async function cssParse(filePath: string) {
  // todo: 推断出当前是哪个 folder
  const exist = await exists(filePath);
  if (!exist) return;

  const fileContent = await (await readFile(filePath)).toString('utf-8');
  return fileContent;
}

export default cssParse;
