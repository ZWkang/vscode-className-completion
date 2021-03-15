import * as nodeSass from 'sass'
import * as css from 'css'
import * as path from 'path'

import getFileContentStringSync from './getFileContentStringSync'

function parseSassFileClassName(filePath: string): any[] {
  if (
    path.extname(filePath) === '.scss' ||
    path.extname(filePath) === '.sass' ||
    path.extname(filePath) === '.css'
  ) {
    const fileContent = getFileContentStringSync(filePath)
    const result = nodeSass.renderSync({
      data: fileContent
    })
    const cssContent = result.css.toString('utf-8')
    const cssParser: any = css.parse(cssContent)
    const selectorList = cssParser.stylesheet.rules
      .map((rule: any) => rule.selectors)
      .reduce((prev: any, next: any) => [...prev, ...next], [])

    return [...new Set(selectorList)]
  }
  return []
}

export default parseSassFileClassName
