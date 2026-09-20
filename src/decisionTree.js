const knowledge = require('../data/knowledge.json');

function createDecisionTree(tree, startNode) {
  let currentNode = startNode;
  let history = [];

  function start() {
    currentNode = startNode;
    history = [];
  }

  function getCurrentNode() {
    return tree[currentNode];
  }

  function getOptions() {
    return getCurrentNode().options || [];
  }

  function select(index) {
    const node = getCurrentNode();

    if (node.solution || !node.next?.[index]) return;

    history.push(currentNode);
    currentNode = node.next[index];
  }

  function goBack() {
    if (!history.length) return false;

    currentNode = history.pop();
    return true;
  }

  function isSolution() {
    return Boolean(getCurrentNode().solution);
  }

  return {
    start,
    getCurrentNode,
    getOptions,
    select,
    goBack,
    isSolution
  };
}

const category = knowledge.menus.categories[0];
const problem = knowledge.problems[category][0].decisionTree;

let activeTree = createDecisionTree(problem.nodes, problem.start);

function start(treeData) {
  activeTree = createDecisionTree(treeData.nodes, treeData.start);
  activeTree.start();
}

module.exports = {
  createDecisionTree,
  start,
  getCurrentNode: () => activeTree.getCurrentNode(),
  getOptions: () => activeTree.getOptions(),
  select: index => activeTree.select(index),
  goBack: () => activeTree.goBack(),
  isSolution: () => activeTree.isSolution()
};