function clearScreen() {
  process.stdout.write('\x1b[2J\x1b[H');
}

function render(state, options, decisionNode) {
  clearScreen();

  const titles = {
    main: 'CONTACT CENTER KNOWLEDGE BASE',
    categories: 'CATEGORIES',
    search: 'SEARCH KNOWLEDGE BASE',
    searchResults: 'SEARCH RESULTS',
    decision: state.selectedProblem?.title.toUpperCase(),
    problems: state.selectedCategory.toUpperCase()
  };

  console.log('========================================');
  console.log(`          ${titles[state.screen]}`);
  console.log('========================================\n');

  if (state.screen === 'search') {
    console.log('Enter search term:\n');
    console.log('Press ENTER to search');
  }

  if (state.screen === 'searchResults' && !options.length) {
    console.log('No matching knowledge found.');
  }

  if (state.screen === 'decision') {
    console.log(decisionNode.solution || decisionNode.question);
    console.log();
  }

  options.forEach((option, index) => {
    console.log((index === state.index ? '> ' : '  ') + option);
  });

  if (state.screen !== 'search' &&
      !(state.screen === 'searchResults' && !options.length)) {
    console.log('\nControls:');
    console.log('↑ ↓ Navigate');
    console.log('ENTER Select');
  }

  if (state.screen !== 'main') {
    console.log('B Back');
  } else {
    console.log('Q Quit');
  }
}

module.exports = {
  clearScreen,
  render
};