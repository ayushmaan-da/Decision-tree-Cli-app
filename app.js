const menu = require('./src/menu');
const decisionTree = require('./src/decisionTree');
const ui = require('./src/ui');
const input = require('./src/input');

const state = {
  screen: 'main',
  index: 0,
  selectedCategory: ''
};

function getOptions() {
  if (state.screen === 'decision') {
    return decisionTree.getOptions();
  }

  return menu.getOptions(state.screen, state.selectedCategory);
}

function render() {
  ui.render(
    state,
    getOptions(),
    decisionTree.getCurrentNode()
  );
}

function exit() {
  input.stopInput();
  console.log('\nExiting.');
}

function moveUp() {
  const options = getOptions();

  if (options.length > 0) {
    state.index =
      (state.index - 1 + options.length) %
      options.length;
  }

  render();
}

function moveDown() {
  const options = getOptions();

  if (options.length > 0) {
    state.index =
      (state.index + 1) %
      options.length;
  }

  render();
}

function select() {
  const options = getOptions();

  if (state.screen === 'main') {
    if (state.index === 0) {
      state.screen = 'categories';
      state.index = 0;
      render();
    } else if (state.index === options.length - 1) {
      exit();
    }

    return;
  }

  if (state.screen === 'categories') {
    state.selectedCategory = options[state.index];

    if (state.selectedCategory === 'Payment Issues') {
      state.screen = 'problems';
      state.index = 0;
      render();
    } else {
      console.log(
        `\nNo problems available for ${state.selectedCategory}.`
      );
    }

    return;
  }

  if (state.screen === 'problems') {
    if (options[state.index] === 'Payment Failed') {
      state.screen = 'decision';
      state.index = 0;
      decisionTree.start();
      render();
    } else {
      console.log(`\nYou selected: ${options[state.index]}`);
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
      state.screen = 'problems';
    }
  } else if (state.screen === 'categories') {
    state.screen = 'main';
  } else if (state.screen === 'problems') {
    state.screen = 'categories';
  }

  state.index = 0;
  render();
}

render();

input.startInput({
  onUp: moveUp,
  onDown: moveDown,
  onEnter: select,
  onBack: back,
  onQuit: exit
});