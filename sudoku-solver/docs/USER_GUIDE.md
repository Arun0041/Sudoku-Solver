# User Guide

## What This App Does

This Sudoku Solver lets you enter a Sudoku puzzle, validate it for rule conflicts, and watch a backtracking algorithm solve it step by step.

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open the local URL shown in terminal.

## Main Controls

- Solve Puzzle: starts the visual solving process.
- Stop: halts solving while the algorithm is running.
- Validate Board: checks for duplicate values in rows, columns, and 3x3 boxes.
- Clear Board: clears all cells and resets board state.
- Speed Slider: controls animation delay for visualization.
- Easy / Medium: loads built-in sample puzzles.

## Input Rules

- Only digits 1 through 9 are accepted.
- Empty values are allowed.
- Given cells from loaded sample puzzles are locked.

## Status Messages

The status area explains the current app state, for example:

- Ready to Solve
- Board updated
- Loaded easy sample
- Found N conflicting cells
- Solve completed or unsolvable board

## Conflict Highlighting

When the board has invalid duplicates:

- Conflicting cells are highlighted in red.
- Solve action is blocked until conflicts are fixed.

## Typical Workflow

1. Load a sample puzzle or type your own values.
2. Click Validate Board.
3. Fix any highlighted conflicts.
4. Set visualization speed.
5. Click Solve Puzzle.
6. Use Stop any time if needed.

## Troubleshooting

- Nothing happens on Solve: run Validate Board and fix red cells first.
- Puzzle cannot be solved: check input correctness; some boards are unsolvable.
- Cells are not editable: those are locked clue cells from sample puzzles.
