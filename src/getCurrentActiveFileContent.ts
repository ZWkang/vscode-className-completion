import * as vscode from 'vscode';
import getFileContentStringSync from './getFileContentStringSync';

function getCurrentActiveFileContent() {
  const currentlyActiveFile = vscode.window.activeTextEditor?.document.fileName;
  if (!currentlyActiveFile) {
    return null;
  }

  return getFileContentStringSync(currentlyActiveFile);
}

export default getCurrentActiveFileContent;
