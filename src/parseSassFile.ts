import * as nodeSass from 'sass';
import * as css from 'css';

import { depFileReg } from './constants';
import getFileContentStringSync from './getFileContentStringSync';
import { removeDuplicationList } from './util';

function parseSassFileClassName(filePath: string) {
  if (depFileReg.test(filePath)) {
    const fileContent = getFileContentStringSync(filePath);
    const result = nodeSass.renderSync({
      data: fileContent
    });
    const cssContent = result.css.toString('utf-8');
    const cssParser = css.parse(cssContent);
    if (!cssParser.stylesheet) {
      return [];
    }
    const selectorList = cssParser.stylesheet.rules
      .map((rule: css.Rule) => rule?.selectors)
      .filter(v => v)
      .reduce((prev = [], next = []) => [...prev, ...next], []);

    return removeDuplicationList<string>(selectorList || []);
  }
  return [];
}

export default parseSassFileClassName;
