import { Link } from "react-router-dom";

type Props = {
  score: number;
  sessionId: string;
  onPlayAgain: () => void;
  onNavigateAway: () => void;
};

const QuizResults = ({
  score,
  sessionId,
  onPlayAgain,
  onNavigateAway,
}: Props) => {
  const passed = score >= 2;

  return (
    <div className="text-center flex flex-col gap-20">
      <h1 className="text-amber-200/50 text-xl tracking-[0.2em] uppercase">
        Trial Concluded
      </h1>

      {passed ? (
        <h1 className="text-amber-200 text-5xl md:text-8xl bg-amber-600/10 uppercase">
          Conquered
        </h1>
      ) : (
        <h1 className="text-red-700 text-6xl md:text-8xl uppercase drop-shadow-[0_0_15px_rgba(185,28,28,0.5)]">
          You Failed
        </h1>
      )}

      <p className="px-5 text-amber-300 text-3xl tracking-[0.2em]">
        Runes acquired: {score}
      </p>

      <div className="flex md:gap-20 my-5 justify-between md:max-w-2xl md:mx-auto">
        <Link
          to={`/home/${sessionId}`}
          onClick={onNavigateAway}
          className="cursor-pointer w-48 py-3 m-2 border border-amber-500 bg-amber-600/10 hover:bg-amber-600/20 transition-all text-amber-400 text-sm tracking-widest uppercase font-bold text-center"
        >
          Categories
        </Link>
        <Link
          to={`/stats/${sessionId}`}
          onClick={onNavigateAway}
          className="cursor-pointer w-48 py-3 m-2 border border-amber-500 bg-amber-600/10 hover:bg-amber-600/20 transition-all text-amber-400 text-sm tracking-widest uppercase font-bold text-center"
        >
          Check Stats
        </Link>
        <button
          onClick={onPlayAgain}
          className="cursor-pointer w-48 py-3 m-2 border border-amber-500 bg-amber-600/10 hover:bg-amber-600/20 transition-all text-amber-400 text-sm tracking-widest uppercase font-bold text-center"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default QuizResults;
