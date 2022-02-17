import * as css from 'css';
import * as path from 'path';
import { removeDuplicationList } from './util';
import map from './parses';

async function parseSassFileClassName(filePath: string) {
  const extname = path.extname(filePath);
  let fileContent = '';
  if (map.has(extname)) {
    fileContent = await map.get(extname)(filePath);
  }
  if (!fileContent) return;
  const cssParser = css.parse(fileContent);
  if (!cssParser.stylesheet) {
    return [];
  }
  const selectorList = cssParser.stylesheet.rules
    .map((rule: css.Rule) => rule?.selectors)
    .filter(Boolean)
    .reduce((prev = [], next = []) => [...prev, ...next], []);

  return removeDuplicationList<string>(selectorList || []);
}

export default parseSassFileClassName;
