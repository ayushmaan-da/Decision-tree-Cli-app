const menu = require('./src/menu');
const decisionTree = require('./src/decisionTree');
const knowledgeBase = require('./src/knowledgeBase');
const ui = require('./src/ui');
const input = require('./src/input');

const state = {
  screen: 'main',
  index: 0,
  selectedCategory: '',
  selectedProblem: null,
  searchTerm: '',
  searchResults: [],
  previousScreen: ''
};

function getOptions() {
  if (state.screen === 'decision') return decisionTree.getOptions();
  if (state.screen === 'searchResults') {
    return state.searchResults.map(problem => problem.title);
  }
  return menu.getOptions(state.screen, state.selectedCategory);
}

function render() {
  ui.render(state, getOptions(), decisionTree.getCurrentNode());
}

function resetScreen(screen) {
  state.screen = screen;
  state.index = 0;
  render();
}

function exit() {
  input.stopInput();
  console.log('\nExiting.');
}

function move(direction) {
  const options = getOptions();

  if (options.length) {
    state.index =
      (state.index + direction + options.length) % options.length;
  }

  render();
}

function startSearch() {
  state.searchTerm = '';
  state.searchResults = [];
  resetScreen('search');
  beginSearchInput();
}

function beginSearchInput() {
  input.startTextInput(
    term => {
      state.searchTerm = term;
      finishSearch();
    },
    back,
    exit
  );
}

function finishSearch() {
  state.searchResults = knowledgeBase.search(state.searchTerm);
  resetScreen('searchResults');
}

function handleAction(action) {
  const actions = {
    up: () => move(-1),
    down: () => move(1),
    enter: select,
    back,
    quit: exit
  };

  if (actions[action]) actions[action]();
}

function select() {
  const options = getOptions();

  if (state.screen === 'main') {
    if (state.index === 0) resetScreen('categories');
    else if (state.index === 1) startSearch();
    else if (state.index === 2) resetScreen('browse');
    else if (state.index === 3) resetScreen('manage');
    else if (state.index === options.length - 1) exit();
    return;
  }

  if (state.screen === 'search') {
    if (state.searchTerm.trim()) finishSearch();
    return;
  }

  if (state.screen === 'searchResults') {
    if (!state.searchResults.length) return;

    state.selectedProblem = state.searchResults[state.index];
    state.selectedCategory = state.selectedProblem.category;
    state.previousScreen = 'searchResults';
    state.screen = 'decision';
    state.index = 0;

    decisionTree.start(state.selectedProblem.decisionTree);
    render();
    return;
  }

  if (state.screen === 'categories') {
    state.selectedCategory = options[state.index];
    resetScreen('problems');
    return;
  }

  if (state.screen === 'problems') {
    const problem = menu.getProblem(
      state.selectedCategory,
      options[state.index]
    );

    if (problem) {
      state.selectedProblem = problem;
      state.previousScreen = 'problems';
      state.screen = 'decision';
      state.index = 0;

      decisionTree.start(problem.decisionTree);
      render();
    }

    return;
  }

  if (state.screen === 'decision') {
    decisionTree.select(state.index);
    state.index = 0;
    render();
  }
}

function back() {
  if (state.screen === 'decision') {
    if (!decisionTree.goBack()) {
      state.screen = state.previousScreen || 'problems';
    }
  } else if (state.screen === 'search') {
    state.screen = 'main';
  } else if (state.screen === 'searchResults') {
    state.searchTerm = '';
    resetScreen('search');
    beginSearchInput();
    return;
  } else if (state.screen === 'categories') {
    state.screen = 'main';
  } else if (state.screen === 'problems') {
    state.screen = 'categories';
  } else if (state.screen === 'browse' || state.screen === 'manage') {
    state.screen = 'main';
  }

  state.index = 0;
  render();
}

render();
input.startInput(handleAction);