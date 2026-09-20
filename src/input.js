let actionHandler;
let dataHandler;
let textHandler;
let textInputActive = false;
let textBuffer = '';

function startInput(onAction) {
  actionHandler = onAction;

  dataHandler = key => {
    if (textInputActive) return;

    if (key[0] === 3) return actionHandler('quit');

    const input = key.toString();

    if (input === '\x1b[A') actionHandler('up');
    else if (input === '\x1b[B') actionHandler('down');
    else if (key[0] === 13 || key[0] === 10) actionHandler('enter');
    else if (key[0] === 66 || key[0] === 98) actionHandler('back');
    else if (key[0] === 81 || key[0] === 113) actionHandler('quit');
  };

  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.on('data', dataHandler);
}

function startTextInput(onSubmit, onBack, onQuit) {
  textInputActive = true;
  textBuffer = '';

  process.stdin.removeListener('data', dataHandler);

  textHandler = key => {
    for (const code of key) {
      if (code === 13 || code === 10) {
        if (!textBuffer.trim()) continue;

        const term = textBuffer.trim();

        process.stdin.removeListener('data', textHandler);
        textHandler = null;
        textInputActive = false;
        process.stdin.on('data', dataHandler);

        if (term.toLowerCase() === 'b') onBack();
        else if (term.toLowerCase() === 'q') onQuit();
        else onSubmit(term);

        return;
      }

      if (code === 3) {
        process.stdin.removeListener('data', textHandler);
        textHandler = null;
        textInputActive = false;
        onQuit();
        return;
      }

      if (code === 8 || code === 127) {
        if (textBuffer) {
          textBuffer = textBuffer.slice(0, -1);
          process.stdout.write('\b \b');
        }
        continue;
      }

      if (code >= 32 && code <= 126) {
        const character = String.fromCharCode(code);
        textBuffer += character;
        process.stdout.write(character);
      }
    }
  };

  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.on('data', textHandler);
}

function stopInput() {
  if (dataHandler) process.stdin.removeListener('data', dataHandler);
  if (textHandler) process.stdin.removeListener('data', textHandler);

  process.stdin.setRawMode(false);
  process.stdin.pause();
  textInputActive = false;
}

module.exports = {
  startInput,
  startTextInput,
  stopInput
};