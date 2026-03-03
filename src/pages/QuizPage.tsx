import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getQuizData } from "../services/triviaApi";
import { saveScoreToStorage, useSessionGuard } from "../utils/quizUtils";
import QuizResults from "../components/quiz/QuizResults";
import { useCategory, useLoading, useQuizData } from "../hooks";
import Spinner from "../components/Spinner";
import { QuizMain } from "../components/quiz/QuizMain";

const QuizPage = () => {
  const [current, setCurrent] = useState(() => {
    const stored = localStorage.getItem("current");
    return stored ? (JSON.parse(stored) as number) : 0;
  });
  const { quizData } = useQuizData();
  const { setQuizData } = useQuizData();
  const { previousCategory } = useCategory();
  const { setIsLoading } = useLoading();
  const navigate = useNavigate();
  const sessionId = useSessionGuard();
  const [score, setScore] = useState<number>(() => {
    const stored = localStorage.getItem("score");
    return stored ? (JSON.parse(stored) as number) : 0;
  });

  useEffect(() => {
    localStorage.setItem("current", JSON.stringify(current));
  }, [current]);
  useEffect(() => {
    localStorage.setItem("score", JSON.stringify(score));
  }, [score]);

  const handleQuizComplete = () => {
    saveScoreToStorage(score);
    localStorage.removeItem("score");
    localStorage.setItem("current", JSON.stringify(0));
    setCurrent(0);
    setScore(0);
  };

  const handlePlayAgain = async () => {
    if (!sessionId) return;
    handleQuizComplete();
    setIsLoading(true);
    try {
      const res = await getQuizData(previousCategory, sessionId);
      setQuizData(res.data.results);
      localStorage.setItem("quiz", JSON.stringify(res.data.results));
    } catch {
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#13201f] h-full overflow-y-scroll ">
      <div className="p-10 h-full w-full ">
        {quizData.length === 0 ? (
          <Spinner label="Summoning Questions..." />
        ) : current === 3 ? (
          <>
            <QuizResults
              score={score}
              onPlayAgain={handlePlayAgain}
              onNavigateAway={handleQuizComplete}
              sessionId={sessionId!}
            />
          </>
        ) : (
          <>
            <QuizMain
              current={current}
              setCurrent={setCurrent}
              score={score}
              setScore={setScore}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
