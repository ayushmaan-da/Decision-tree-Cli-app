function clearScreen() {
  process.stdout.write('\x1b[2J\x1b[H');
}

function render(state, options, decisionNode) {
  clearScreen();

  console.log('========================================');

  if (state.screen === 'main') {
    console.log('     CONTACT CENTER KNOWLEDGE BASE');
  } else if (state.screen === 'categories') {
    console.log('              CATEGORIES');
  } else if (state.screen === 'decision') {
    console.log('          PAYMENT FAILED');
  } else {
    console.log(`          ${state.selectedCategory.toUpperCase()}`);
  }

  console.log('========================================\n');

  if (state.screen === 'decision') {
    console.log(decisionNode.solution || decisionNode.question);
    console.log();
  }

  options.forEach((option, index) => {
    const marker = index === state.index ? '> ' : '  ';
    console.log(marker + option);
  });

  console.log('\nControls:');
  console.log('↑ ↓ Navigate');
  console.log('ENTER Select');

  if (state.screen !== 'main') {
    console.log('B Back');
  }

  console.log('Q Quit');
}

module.exports = {
  clearScreen,
  render
};
