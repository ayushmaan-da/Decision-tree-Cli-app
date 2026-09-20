const knowledge = require('../data/knowledge.json');

function search(term) {
  const searchTerm = term.toLowerCase();
  const results = [];

  if (searchTerm.trim() === '') {
    return results;
  }

  for (const category of knowledge.menus.categories) {
    const categoryText = category.toLowerCase();
    const categoryProblems = knowledge.problems[category] || [];

    for (const problem of categoryProblems) {
      const titleMatches = problem.title.toLowerCase().includes(searchTerm);
      const descriptionMatches = problem.description.toLowerCase().includes(searchTerm);
      const keywordMatches = problem.keywords.some(keyword =>
        keyword.toLowerCase().includes(searchTerm)
      );

      if (categoryText.includes(searchTerm) || titleMatches || descriptionMatches || keywordMatches) {
        results.push({
          ...problem,
          category
        });
      }
    }
  }

  return results;
}

module.exports = {
  search
};
