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

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(TURNS.X);

  const updateBoard = (index) => {
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
  };

  return (
    <>
      <section className="grid grid-cols-3 w-[300px] h-[300px] gap-2">
        {board.map((_, index) => {
          return (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
              {board[index]}
            </Square>
          );
        })}
      </section>

      <section className="grid grid-cols-2">
        <Turn isSelected={turn === TURNS.X}>{TURNS.X}</Turn>
        <Turn isSelected={turn === TURNS.O}>{TURNS.O}</Turn>
      </section>
    </>
  );
};

export { App };
