const knowledge = require('../data/knowledge.json');

const menus = knowledge.menus;
const problems = knowledge.problems;

function getOptions(screen, selectedCategory) {
  if (screen === 'main') {
    return menus.main;
  }

  if (screen === 'categories') {
    return menus.categories;
  }

  return menus[selectedCategory] || [];
}

function getProblem(category, title) {
  const categoryProblems = problems[category] || [];
  return categoryProblems.find(problem => problem.title === title);
}

module.exports = {
  menus,
  getOptions,
  getProblem
};
