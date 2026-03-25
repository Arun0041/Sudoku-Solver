import { useMemo, useRef, useState } from 'react';
import { isValid, sleep } from './solver';
import './App.css';

const initialBoard = Array(9).fill(null).map(() => Array(9).fill(""));

const SAMPLE_PUZZLES = {
  easy: [
    [5, 3, "", "", 7, "", "", "", ""],
    [6, "", "", 1, 9, 5, "", "", ""],
    ["", 9, 8, "", "", "", "", 6, ""],
    [8, "", "", "", 6, "", "", "", 3],
    [4, "", "", 8, "", 3, "", "", 1],
    [7, "", "", "", 2, "", "", "", 6],
    ["", 6, "", "", "", "", 2, 8, ""],
    ["", "", "", 4, 1, 9, "", "", 5],
    ["", "", "", "", 8, "", "", 7, 9],
  ],
  medium: [
    ["", 2, "", 6, "", 8, "", "", ""],
    [5, 8, "", "", "", 9, 7, "", ""],
    ["", "", "", "", 4, "", "", "", ""],
    [3, 7, "", "", "", "", 5, "", ""],
    [6, "", "", "", "", "", "", "", 4],
    ["", "", 8, "", "", "", "", 1, 3],
    ["", "", "", "", 2, "", "", "", ""],
    ["", "", 9, 8, "", "", "", 3, 6],
    ["", "", "", 3, "", 6, "", 9, ""],
  ],
};

const getConflicts = (board) => {
  const conflictCells = new Set();
  const addConflicts = (positions) => {
    const valueMap = new Map();

    for (const [row, col] of positions) {
      const value = board[row][col];
      if (value === "") continue;

      if (!valueMap.has(value)) valueMap.set(value, []);
      valueMap.get(value).push([row, col]);
    }

    for (const entries of valueMap.values()) {
      if (entries.length > 1) {
        for (const [row, col] of entries) {
          conflictCells.add(`${row}-${col}`);
        }
      }
    }
  };

  for (let row = 0; row < 9; row++) {
    addConflicts(Array.from({ length: 9 }, (_, col) => [row, col]));
  }

  for (let col = 0; col < 9; col++) {
    addConflicts(Array.from({ length: 9 }, (_, row) => [row, col]));
  }

  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const positions = [];
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          positions.push([boxRow * 3 + r, boxCol * 3 + c]);
        }
      }
      addConflicts(positions);
    }
  }

  return conflictCells;
};

function App() {
  const [board, setBoard] = useState(initialBoard);
  const [givenMask, setGivenMask] = useState(
    Array(9).fill(null).map(() => Array(9).fill(false))
  );

  const [isSolving, setIsSolving] = useState(false);
  const [status, setStatus] = useState("Ready to Solve");
  const [speed, setSpeed] = useState(10); 
  const stopRef = useRef(false);
  const speedRef = useRef(speed); 
  speedRef.current = speed;

  const conflicts = useMemo(() => getConflicts(board), [board]);
  const emptyCells = useMemo(
    () => board.flat().filter((cell) => cell === "").length,
    [board]
  );
  const hasValues = emptyCells < 81;

  const handleChange = (row, col, value) => {
    if (isSolving) return;
    if (!/^[1-9]?$/.test(value)) return;
    if (givenMask[row][col]) return;
    
    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = value === "" ? "" : Number(value);

    setBoard(newBoard);
    setStatus("Board updated");
  };

  const solveSudoku = async (currentBoard) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (currentBoard[row][col] === "") {
          for (let num = 1; num <= 9; num++) {
            if (stopRef.current) return false;

            if (isValid(currentBoard, row, col, num)) {
              currentBoard[row][col] = num;
              setBoard([...currentBoard]); 
              const delay = Math.max(0, 150 - speedRef.current);
              if (delay > 0) await sleep(delay);

              if (await solveSudoku(currentBoard)) return true;

              // Backtrack
              currentBoard[row][col] = "";
              setBoard([...currentBoard]);
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  const handleSolve = async () => {
    if (!hasValues) {
      setStatus("Enter a puzzle first");
      return;
    }

    if (conflicts.size > 0) {
      setStatus("Resolve highlighted conflicts before solving");
      return;
    }

    stopRef.current = false; 
    setIsSolving(true);
    setStatus("Solving...");

    const boardCopy = board.map(row => [...row]);
    
    const result = await solveSudoku(boardCopy);
    
    if (!stopRef.current) {
        setStatus(result ? "Solved Successfully! 🎉" : "Unsolvable Board ❌");
    } else {
        setStatus("Stopped by User 🛑");
    }
    setIsSolving(false);
  };

  const handleStop = () => {
    stopRef.current = true;
  };

  const handleReset = () => {
    stopRef.current = true; 
    setBoard(Array(9).fill(null).map(() => Array(9).fill("")));
    setGivenMask(Array(9).fill(null).map(() => Array(9).fill(false)));
    setStatus("Board Reset");
    setIsSolving(false);
  };

  const handleLoadSample = (level) => {
    if (isSolving) return;

    const sample = SAMPLE_PUZZLES[level].map((row) => [...row]);
    setBoard(sample);
    setGivenMask(sample.map((row) => row.map((cell) => cell !== "")));
    setStatus(`Loaded ${level} sample`);
  };

  const handleValidate = () => {
    if (!hasValues) {
      setStatus("Board is empty");
      return;
    }

    if (conflicts.size > 0) {
      setStatus(`Found ${conflicts.size} conflicting cells`);
      return;
    }

    setStatus("Board is valid so far");
  };

  return (
    <div className="app-shell">
      <div className="sudoku-panel">
        <div className="board-column">
            <div className="grid-wrap">
                {board.map((row, rIndex) => (
                <div key={rIndex} className="grid-row">
                    {row.map((cell, cIndex) => {
                        const isGiven = givenMask[rIndex][cIndex];
                        const isConflict = conflicts.has(`${rIndex}-${cIndex}`);
                        return (
                        <input
                            key={`${rIndex}-${cIndex}`}
                            type="text"
                            value={cell}
                            disabled={isSolving || isGiven}
                            onChange={(e) => handleChange(rIndex, cIndex, e.target.value)}
                            className={`
                            grid-cell
                            ${(cIndex + 1) % 3 === 0 && cIndex !== 8 ? "cell-block-right" : ""}
                            ${(rIndex + 1) % 3 === 0 && rIndex !== 8 ? "cell-block-bottom" : ""}
                            ${isGiven ? "cell-given" : ""}
                            ${cell !== "" && !isGiven ? "cell-filled" : ""}
                            ${isConflict ? "cell-conflict" : ""}
                            `}
                        />
                        );
                    })}
                </div>
                ))}
            </div>
        </div>

        <div className="controls-column">
            <div>
                <h1 className="title">
                    Sudoku Solver
                </h1>
                <p className="status">{status}</p>
            </div>

            <div className="card">
                <label className="label">
                    Visualization Speed
                </label>
                <input 
                    type="range" 
                    min="0" 
                    max="150" 
                    value={speed} 
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="slider"
                />
                  <div className="meter-row">
                    <span>Slow</span>
                    <span>Fast</span>
                </div>
            </div>

                <div className="stats-row">
                  <div className="stat-box">
                  <strong>{emptyCells}</strong>
                  <span>Empty Cells</span>
                  </div>
                  <div className="stat-box">
                  <strong>{conflicts.size}</strong>
                  <span>Conflicts</span>
                  </div>
                </div>

                <div className="button-stack">
                {!isSolving ? (
                    <button
                        onClick={handleSolve}
                      className="btn btn-primary"
                    >
                      Solve Puzzle
                    </button>
                ) : (
                    <button
                        onClick={handleStop}
                      className="btn btn-stop"
                    >
                      Stop
                    </button>
                )}

                  <button
                    onClick={handleValidate}
                    className="btn btn-ghost"
                  >
                    Validate Board
                  </button>

                <button
                    onClick={handleReset}
                    className="btn btn-ghost"
                >
                    Clear Board
                </button>
            </div>

                <div className="card">
                  <p className="label">Load Sample Puzzle</p>
                  <div className="sample-row">
                  <button className="btn btn-sample" onClick={() => handleLoadSample("easy")}>Easy</button>
                  <button className="btn btn-sample" onClick={() => handleLoadSample("medium")}>Medium</button>
                  </div>
                </div>

                <div className="hint-box">
                  <p><strong>Tip:</strong> Red cells indicate rule conflicts. Given cells from sample puzzles are locked.</p>
            </div>
        </div>

      </div>
    </div>
  );
}

export default App;