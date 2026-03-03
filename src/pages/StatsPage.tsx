import { Link, useNavigate } from "react-router-dom";
import { checkStatus, useSessionGuard } from "../utils/quizUtils";

const StatsPage = () => {
  //High Score logic
  // Stats.map((stats)=>[stats.score]) ...make stats a context to access here
  // Math.max(...numbers); to get the largest number

  const sessionId = useSessionGuard();
  const stored = localStorage.getItem("stats");
  const stats: number[] = stored ? JSON.parse(stored) : [];
  const highScore = Math.max(...stats);
  const gamesCompleted = stats.length;
  const navigate = useNavigate();

  const { win, loss } = stats.reduce(
    (acc, score) => {
      if (checkStatus(score) === "win") acc.win++;
      else acc.loss++;
      return acc;
    },
    { win: 0, loss: 0 },
  );

const clearStats = () => {
  localStorage.removeItem("stats");
  navigate(`/stats/${sessionId}`);
} 


  //games played/completed  arr.length - 1
  return (
    <div className="bg-[#13201f] h-screen overflow-y-scroll text-amber-600 text-2xl">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-amber-200/50 text-xl tracking-[0.2em] mt-10 uppercase text-center">
          Your stats
        </h1>
        <div className="p-5 text-center bg-[#16191A] border border-amber-900/20 m-10 py-20 text-4xl">{`Your Highest Score is ${highScore} runes `}</div>
        <div className="grid grid-cols-2 p-5 gap-5">
          <div className="p-5 border border-amber-900/20 bg-[#16191A] text-center">
            {" "}
            You passed {win} quiz{win > 1 ? "zes" : ""} <br /> You failed {loss}{" "}
            quiz{loss > 1 ? "zes" : ""}
          </div>
          <div className="p-5 border text-center border-amber-900/20 bg-[#16191A]">
            {`You completed ${gamesCompleted} quest${gamesCompleted > 1 ? "s" : ""}`}{" "}
            <br />
            You ababdoned x quests
          </div>
        </div>
        <div className="p-5 text-center text-gray-500 bg-[#16191A] border border-amber-900/20 m-10 py-20 text-8xl">
          <div className=" items-center gap-5 inline-flex ">
            {" "}
            <span className="pb-5 text-green-700">
              <p className="text-xl">win</p> {win}{" "}
            </span>{" "}
            /
            <span className="pb-5 text-red-700">
              <p className="text-xl">loss</p>
              {loss}
            </span>
          </div>
        </div>
      </div>
      <div className="flex md:gap-20 my-5 justify-between md:max-w-2xl md:mx-auto text-center">
        <Link
          to={`/home/${sessionId}`}
          className="w-48 py-3 m-2 border border-amber-500 bg-amber-600/10 hover:bg-amber-600/20 transition-all text-amber-400 text-sm tracking-widest uppercase font-bold"
        >
          categories
        </Link>
        <button
          // to={`/stats/${sessionId}`} ///should not be a link it only shows results after load
          onClick={clearStats}
          className="w-48 py-3 m-2  border border-red-500 bg-red-600/10 hover:bg-red-600/20 transition-all text-red-400 text-sm tracking-widest uppercase font-bold cursor-pointer"
        >
          Be birthed anew
        </button>
      </div>
    </div>
  );
};

export default StatsPage;
