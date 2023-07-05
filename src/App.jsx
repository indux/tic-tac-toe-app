import React, { useState } from "react";
import { Square } from "./components/Square";
import { Turn } from "./components/Turn";
import { TURNS, WINNER_COMBOS } from "./helpers/constans";
import { checkWinner, checkEndGame } from "./logic/board";
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

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  return (
    <>
      <section className="grid grid-cols-3 w-[310px] gap-2 mb-10">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>

      <section className="grid grid-cols-2">
        <Turn isSelected={turn === TURNS.X}>{TURNS.X}</Turn>
        <Turn isSelected={turn === TURNS.O}>{TURNS.O}</Turn>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </>
  );
};

export { App };
