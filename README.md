Contact Center Knowledge Management CLI

A terminal-based knowledge management tool designed for **contact-center agents**. It helps agents navigate customer issues, follow decision-tree troubleshooting, search the knowledge base, and find appropriate solutions.

Built with **Node.js** and a simple interactive terminal interface.

# Features

- 🎧 **Agent Support**
  - Navigate through support categories and customer issues.
  - Follow decision-tree questions to reach solutions.

- 🔎 **Search Knowledge Base**
  - Search problems using keywords.
  - Case-insensitive search.
  - Open a problem's decision tree directly from search results.

- 🌳 **Decision Trees**
  - Guides agents through required questions.
  - Different answers can lead to different solutions.
  - Supports back navigation.

- ⌨️ **Keyboard Navigation**
  - ↑ / ↓ — Navigate
  - ENTER — Select
  - B — Go back
  - Q — Quit
  - CTRL + C — Exit

# Categories

- Account Issues
- Payment Issues
- Internet Issues
- Delivery Issues
- Technical Support

## Project Structure


Decision-tree-Cli-app/
│
├── app.js
├── package.json
│
├── data/
│   └── knowledge.json
│
└── src/
    ├── input.js
    ├── menu.js
    ├── decisionTree.js
    ├── knowledgeBase.js
    └── ui.js
