# Sudoku Solver Visualizer

A React + Vite Sudoku web app that visualizes backtracking in real time.

## Documentation

- [User Guide](docs/USER_GUIDE.md)
- [Developer Guide](docs/DEVELOPER_GUIDE.md)
- [Changelog](docs/CHANGELOG.md)

## Features

- Interactive 9x9 Sudoku grid.
- Backtracking solver with step-by-step visualization.
- Adjustable solve speed.
- Start/stop controls while solving.
- Board validation that highlights rule conflicts.
- Sample puzzle loader (`Easy` and `Medium`).
- Real-time board stats (`Empty Cells`, `Conflicts`).

## New Project Feature

### Validation + Conflict Highlighting

The app now validates the current board before solving and can also be checked manually with `Validate Board`.

- Conflicting cells are highlighted in red.
- Solver is blocked until all conflicts are fixed.
- Status messages explain the current board state.

### Sample Puzzle Loader

Use the `Easy` and `Medium` buttons to quickly load playable Sudoku boards.

- Loaded clue cells are treated as fixed and cannot be edited.
- Non-clue cells stay editable for experiments and custom entries.

## How to Run

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open the local URL shown in terminal (usually `http://localhost:5173`).

## Usage Guide

1. Enter digits (`1-9`) into empty cells or load a sample puzzle.
2. Click `Validate Board` to detect conflicts early.
3. Use the speed slider to control animation speed.
4. Click `Solve Puzzle` to watch recursive backtracking.
5. Click `Stop` to halt solving at any point.
6. Click `Clear Board` to reset everything.

## Tech Stack

- React
- Vite
- Plain CSS

## Scripts

- `npm run dev`: start dev server
- `npm run build`: build production bundle
- `npm run preview`: preview production build
- `npm run lint`: run ESLint

## Project Structure

- `src/App.jsx`: main UI, board state, solver flow, validation actions.
- `src/App.css`: layout, visual theme, and mobile responsiveness.
- `src/solver.js`: Sudoku validity check and animation delay helper.
- `docs/`: user and developer documentation.
