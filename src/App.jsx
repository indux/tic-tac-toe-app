import React, { Children, useState } from "react";
import { Square } from "./components/Square";
import { Turn } from "./components/Turn";

const TURNS = {
  X: (
    <svg
      className="w-10"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
    </svg>
  ),
  O: (
    <svg
      className="w-10"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
    </svg>
  ),
};

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 8],
];

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null);

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    return null;
  };

  const updateBoard = (index) => {
    if (board[index] || winner) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    }
  };

  return (
    <>
      <section className="grid grid-cols-3 w-[310px] gap-2 mb-10">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>

      <section className="grid grid-cols-2">
        <Turn isSelected={turn === TURNS.X}>{TURNS.X}</Turn>
        <Turn isSelected={turn === TURNS.O}>{TURNS.O}</Turn>
      </section>

      {winner !== null && (
        <section className="absolute h-full w-full top-0 left-0 grid place-items-center bg-black/50">
          <div className="bg-[#000] border rounded-xl  h-[300px] w-[300px] grid place-content-center space-y-8">
            <h2 className="text-white text-2xl font-medium m-auto">
              {winner === false ? "Empate" : "Ganador:"}
            </h2>
            {winner && <Turn>{winner}</Turn>}

            <button class="flex w-52 items-center justify-center rounded-2xl border-b-4 border-b-[#cdcdcd] bg-[#ffffff] py-4 text-sm font-bold tracking-wider text-black transition duration-150 ease-in-out active:translate-y-1 active:border-b-transparent">
              JUGAR OTRA VEZ
              <svg
                class="ml-2 w-6"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                ></path>
              </svg>
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export { App };
