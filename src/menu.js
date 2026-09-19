const knowledge = require('../data/knowledge.json');

const menus = knowledge.menus;

function getOptions(screen, selectedCategory) {
  if (screen === 'main') {
    return menus.main;
  }

  if (screen === 'categories') {
    return menus.categories;
  }

  return menus[selectedCategory] || [];
}

module.exports = {
  menus,
  getOptions
};
