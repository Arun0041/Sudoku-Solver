# Developer Guide

## Project Structure

- src/App.jsx: main UI and interaction logic.
- src/App.css: responsive styling and component classes.
- src/solver.js: solver helpers, validation and sleep utilities.
- src/main.jsx: React app bootstrap.

## Architecture Overview

The application is a single-page React UI with local state:

- board: 9x9 matrix with numbers or empty strings.
- givenMask: 9x9 boolean matrix for locked sample clues.
- isSolving: indicates active solver run.
- status: user-visible solver and validation state.
- speed: visualization speed control.

Solver flow:

1. User triggers Solve.
2. App validates board has values and no conflicts.
3. Recursive backtracking explores empty cells.
4. Board state updates on every attempt and backtrack.
5. UI reflects progress in real time.

## Key Functions

- handleChange: validates input and updates editable cells.
- handleValidate: reports conflict state.
- handleLoadSample: loads predefined puzzle and locks clues.
- solveSudoku: recursive backtracking solver with speed delay.
- getConflicts: checks row/column/subgrid duplicates.

## Conflict Detection Logic

Conflict detection scans:

- 9 rows
- 9 columns
- 9 subgrids

If a value appears more than once in any unit, all duplicate positions are marked as conflicts.

## Running and Quality Checks

Development:

```bash
npm run dev
```

Lint:

```bash
npm run lint
```

Build:

```bash
npm run build
```

## Extending the App

Suggested extension points:

- Add Hard/Expert sample puzzles in App.jsx.
- Add puzzle import/export via JSON or text format.
- Add test coverage for solver and conflict detection.
- Add keyboard navigation for faster board editing.

## Known Constraints

- Solver uses straightforward backtracking (not optimized heuristics).
- Very hard puzzles may take longer depending on branching.
- Current implementation focuses on client-side single-board solving.
