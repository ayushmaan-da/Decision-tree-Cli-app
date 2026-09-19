function startInput(handlers) {
  process.stdin.setRawMode(true);
  process.stdin.resume();

  process.stdin.on('data', key => {
    if (key[0] === 3) {
      handlers.onQuit();
      return;
    }

    if (key.toString() === '\x1b[A') {
      handlers.onUp();
    } else if (key.toString() === '\x1b[B') {
      handlers.onDown();
    } else if (key[0] === 13 || key[0] === 10) {
      handlers.onEnter();
    } else if (key[0] === 66 || key[0] === 98) {
      handlers.onBack();
    } else if (key[0] === 81 || key[0] === 113) {
      handlers.onQuit();
    }
  });
}

function stopInput() {
  process.stdin.setRawMode(false);
  process.stdin.pause();
}

module.exports = {
  startInput,
  stopInput
};
