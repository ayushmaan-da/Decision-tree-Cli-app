const knowledge = require('../data/knowledge.json');

const decisionTree = knowledge.decisionTree;
let currentNode = 'moneyDeducted';
let history = [];

function start() {
  currentNode = 'moneyDeducted';
  history = [];
}

function getCurrentNode() {
  return decisionTree[currentNode];
}

function getOptions() {
  return getCurrentNode().options || [];
}

function select(index) {
  const node = getCurrentNode();

  if (node.solution) {
    return;
  }

  history.push(currentNode);
  currentNode = node.next[index];
}

function goBack() {
  if (history.length === 0) {
    return false;
  }

  currentNode = history.pop();
  return true;
}

function isSolution() {
  return Boolean(getCurrentNode().solution);
}

module.exports = {
  start,
  getCurrentNode,
  getOptions,
  select,
  goBack,
  isSolution
};
