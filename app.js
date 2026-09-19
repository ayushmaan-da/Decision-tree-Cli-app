process.stdin.setRawMode(true);
process.stdin.resume();

process.stdin.on('data', function (key) {
  if (key[0] === 3) {
    process.stdout.write('\nExiting.\n');
    process.stdin.setRawMode(false);
    process.stdin.pause();
    return;
  }

  if (key[0] === 27 && key[1] === 91 && key[2] === 65) {
    process.stdout.write('UP ARROW\n');
  } else if (key[0] === 27 && key[1] === 91 && key[2] === 66) {
    process.stdout.write('DOWN ARROW\n');
  } else if (key[0] === 13 || key[0] === 10) {
    process.stdout.write('ENTER\n');
  } else if (key[0] === 66 || key[0] === 98) {
    process.stdout.write('B\n');
  } else if (key[0] === 81 || key[0] === 113) {
    process.stdout.write('Q\n');
  }
});
