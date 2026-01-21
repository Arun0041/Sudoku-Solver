# 🧩 Sudoku Solver Visualizer

### A High-Performance React Application to Visualize the Backtracking Algorithm

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel)](https://sudoku-solver-theta-nine.vercel.app/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

## 🚀 Overview

The **Sudoku Solver Visualizer** is an interactive web tool designed to demonstrate how the **Backtracking Algorithm** works in real-time. Unlike standard solvers that return an instant result, this application slows down the execution process, allowing users to watch the recursive logic "think," place numbers, detect conflicts, and backtrack to find the correct solution.

This project demonstrates strong command over **Data Structures & Algorithms (DSA)** applied in a real-world frontend application.

🔗 **Live Demo:** [https://sudoku-solver-theta-nine.vercel.app/](https://sudoku-solver-theta-nine.vercel.app/)

---

## ✨ Key Features

* **⚡ Real-Time Visualization:** Watch the algorithm fill cells, hit dead ends, and backtrack dynamically using standard JavaScript `async/await`.
* **🎛️ Speed Control:** Adjustable slider to control the recursion speed (from "Step-by-Step" to "Instant").
* **🛑 Interactive Controls:** Users can **Stop** the recursion instantly (implemented using `useRef` for thread safety).
* **🎨 Dynamic Coloring:** Visual distinction between **User Input** (Gray/Black) and **AI Solution** (Purple) for clarity.
* **🛡️ Robust Validation:** Prevents invalid inputs (duplicates in row/col/subgrid) before the solver starts.
* **📱 Responsive Design:** Built with **Tailwind CSS**, featuring a modern Glassmorphism UI that works on mobile and desktop.

---

## 🛠️ Tech Stack

* **Frontend Library:** React.js (Vite)
* **Styling:** Tailwind CSS
* **Algorithm:** Backtracking (Recursion)
* **Deployment:** Vercel

---

## 🧠 How It Works (The Algorithm)

This project uses the **Backtracking Algorithm**, a depth-first search approach:

1.  **Find Empty Cell:** The algorithm scans the grid for the first empty cell (`0` or `""`).
2.  **Try Numbers:** It attempts to place numbers `1` through `9`.
3.  **Check Validity:** Before placing a number, it checks if the number exists in the current **Row**, **Column**, or **3x3 Subgrid**.
4.  **Recurse:** If valid, it places the number and moves to the next cell.
5.  **Backtrack:** If it reaches a dead end (no number fits), it resets the current cell to empty and goes back to the previous cell to try a different number.

---

## 💻 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites
* Node.js installed
* npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/Arun0041/Sudoku-Solver.git](https://github.com/Arun0041/Sudoku-Solver.git)
    cd Sudoku-Solver
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Open in Browser**
    Visit `http://localhost:5173` to see the app.

---

## 📬 Contact

**Arun** - **LinkedIn:** [linkedin.com/in/arun004](https://www.linkedin.com/in/arun004/)  
- **GitHub:** [github.com/Arun0041](https://github.com/Arun0041)  
- **Email:** sharmarun004@gmail.com

---

⭐ **If you like this project, please give it a star!**
