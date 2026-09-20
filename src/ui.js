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
    browse: 'BROWSE KNOWLEDGE',
    manage: 'MANAGE KNOWLEDGE',
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

  if (state.screen === 'browse') {
    console.log('Knowledge can currently be browsed through Agent Support.');
  }

  if (state.screen === 'manage') {
    console.log('Knowledge management is not available in this version.');
  }

  options.forEach((option, index) => {
    console.log((index === state.index ? '> ' : '  ') + option);
  });

  if (state.screen === 'main') {
  console.log('\nControls:');
  console.log('↑ ↓ Navigate');
  console.log('ENTER Select');
  console.log('Q Quit');
}
}

module.exports = {
  clearScreen,
  render
};