import { useState, useRef } from 'react';
import { isValid, sleep } from './solver';

const initialBoard = Array(9).fill(null).map(() => Array(9).fill(""));

function App() {
  const [board, setBoard] = useState(initialBoard);
  const [initialMask, setInitialMask] = useState(
    Array(9).fill(null).map(() => Array(9).fill(false))
  );

  const [isSolving, setIsSolving] = useState(false);
  const [status, setStatus] = useState("Ready to Solve");
  const [speed, setSpeed] = useState(10); 
  const stopRef = useRef(false);
  const speedRef = useRef(speed); 
  speedRef.current = speed;

  const handleChange = (row, col, value) => {
    if (isSolving) return;
    const val = parseInt(value);
    
    if ((val >= 1 && val <= 9) || value === "") {
      const newBoard = board.map(r => [...r]);
      const newMask = initialMask.map(r => [...r]);
      
      newBoard[row][col] = value === "" ? "" : val;
      newMask[row][col] = value !== ""; 
      
      setBoard(newBoard);
      setInitialMask(newMask);
      setStatus("Ready");
    }
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
    setInitialMask(Array(9).fill(null).map(() => Array(9).fill(false)));
    setStatus("Board Reset");
    setIsSolving(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4 font-sans">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-4xl w-full flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="flex flex-col items-center">
            <div className="flex flex-col border-4 border-gray-900 bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                {board.map((row, rIndex) => (
                <div key={rIndex} className="flex">
                    {row.map((cell, cIndex) => {
                        const isUserInput = initialMask[rIndex][cIndex];
                        return (
                        <input
                            key={`${rIndex}-${cIndex}`}
                            type="text"
                            value={cell}
                            disabled={isSolving || isUserInput}
                            onChange={(e) => handleChange(rIndex, cIndex, e.target.value)}
                            className={`
                            w-10 h-10 sm:w-12 sm:h-12 text-center text-xl font-bold outline-none transition-all duration-75
                            ${(cIndex + 1) % 3 === 0 && cIndex !== 8 ? "border-r-4 border-gray-900" : "border-r border-gray-300"}
                            ${(rIndex + 1) % 3 === 0 && rIndex !== 8 ? "border-b-4 border-gray-900" : "border-b border-gray-300"}
                            
                            ${ isUserInput 
                                ? "bg-gray-200 text-gray-900"
                                : cell !== "" 
                                    ? "bg-white text-purple-600 scale-110"
                                    : "bg-white hover:bg-purple-50"
                            }
                            `}
                        />
                        );
                    })}
                </div>
                ))}
            </div>
        </div>

        {/* Right Side: Controls */}
        <div className="flex flex-col w-full md:w-1/3 gap-6">
            <div>
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
                    Sudoku Visualizer
                </h1>
                <p className="text-gray-500 font-medium">{status}</p>
            </div>

            {/* Speed Slider */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <label className="text-sm font-bold text-gray-700 mb-2 block">
                    Visualization Speed
                </label>
                <input 
                    type="range" 
                    min="0" 
                    max="150" 
                    value={speed} 
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Slow</span>
                    <span>Fast</span>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
                {!isSolving ? (
                    <button
                        onClick={handleSolve}
                        className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                    >
                        🚀 Solve Puzzle
                    </button>
                ) : (
                    <button
                        onClick={handleStop}
                        className="w-full py-3 bg-red-500 text-white font-bold rounded-xl shadow-lg hover:bg-red-600 transform hover:scale-105 transition-all"
                    >
                        🛑 Stop
                    </button>
                )}

                <button
                    onClick={handleReset}
                    className="w-full py-3 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all"
                >
                    Clear Board
                </button>
            </div>

            {/* Instructions */}
            <div className="text-xs text-gray-400 mt-4 bg-gray-50 p-3 rounded-lg">
                <p><strong>Tip:</strong> Enter your own puzzle numbers (they will turn gray), then hit Solve to watch the backtracking algorithm in action.</p>
            </div>
        </div>

      </div>
    </div>
  );
}

export default App;