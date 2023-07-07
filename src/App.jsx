import React, { useState } from "react";
import { Square } from "./components/Square";
import { Turn } from "./components/Turn";
import { TURNS, WINNER_COMBOS } from "./helpers/constans";
import { checkWinnerFrom, checkEndGame } from "./helpers/board";
import confetti from "canvas-confetti";
import { WinnerModal } from "./components/WinnerModal";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
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

    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  return (
    <>
      <div className="grid place-items-center mb-10">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#059b69] to-[#6fd8b5]">
          Tic Tac Toe
        </h1>
      </div>

      <section className="grid grid-cols-3 w-[300px] gap-2 mb-5">
        {board.map((children, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {children}
            </Square>
          );
        })}
      </section>

      <div className="grid place-items-center mb-7">
        <h2 className="text-3xl font-bold text-white">It's the turn of:</h2>
      </div>

      <section className="grid grid-cols-2">
        <Turn isSelected={turn === TURNS.X}>{TURNS.X}</Turn>
        <Turn isSelected={turn === TURNS.O}>{TURNS.O}</Turn>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </>
  );
};

export { App };
