import React from "react";
import { Turn } from "./Turn";

const WinnerModal = ({ winner, resetGame }) => {
  if (winner === null) return null;

  const winnerText = winner === false ? "Draw" : "Winner:";

  return (
    <section className="absolute h-full w-full top-0 left-0 grid place-items-center bg-black/50">
      <div className="bg-[#00160f] border rounded-xl  h-[300px] w-[300px] grid place-content-center space-y-8">
        <h2 className="text-white text-2xl font-medium m-auto">{winnerText}</h2>
        {winner && <Turn>{winner}</Turn>}
        <button
          onClick={resetGame}
          className="flex w-52 items-center justify-center rounded-2xl border-b-4 border-b-[#cdcdcd] bg-[#ffffff] py-4 text-sm font-bold tracking-wider text-[#00160f] transition duration-150 ease-in-out active:translate-y-1 active:border-b-transparent"
        >
          PLAY AGAIN
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
            className="ml-2 w-6"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            ></path>
          </svg>
        </button>
      </div>
    </section>
  );
};

export { WinnerModal };
