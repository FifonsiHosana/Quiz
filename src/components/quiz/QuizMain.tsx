import { useNavigate } from "react-router-dom";
import he from "he";
import { useMemo, useState } from "react";
import { useQuizData } from "../../hooks";
import { shuffler, useSessionGuard } from "../../utils/quizUtils";
import type { QuizMainProps, QuizQuestion } from "../../types/Index";
import AnswerOption from "./AnswerOptions";

export const QuizMain = ({ setCurrent, current, score, setScore }: QuizMainProps) => {
  const [showMarkScheme, setShowMarkScheme] = useState(false);
  const [wrongSelect, setWrongSelect] = useState("");
  const sessionId = useSessionGuard();
  const navigate = useNavigate();
  const { quizData } = useQuizData();

  const handleAbandon = () => {
    localStorage.setItem("current", JSON.stringify(0));
    navigate(`/home/${sessionId}`);
  };

  const handleNext = () => {
    setCurrent((prev) => prev + 1);
    setShowMarkScheme(false);
    setWrongSelect("");
  };

//   const quizDataCopy = useMemo(
//     () =>
//       quizData.map((data: QuizQuestion) => ({
//         category: data.category,
//         correct_answer: he.decode(data.correct_answer),
//         options: shuffler([
//           he.decode(data.correct_answer),
//           ...data.incorrect_answers.map((item) => he.decode(item)),
//         ]),
//         question: he.decode(data.question),
//       })),
//     [quizData],
//   );

const quizDataCopy = useMemo(
  () =>
    quizData.map((data: QuizQuestion) => {
      const decoded = {
        category: data.category,
        correct_answer: he.decode(data.correct_answer),
        incorrect_answers: data.incorrect_answers.map((a) => he.decode(a)),
        question: he.decode(data.question),
      };
      return {
        ...decoded,
        options: shuffler([
          decoded.correct_answer,
          ...decoded.incorrect_answers,
        ]),
      };
    }),
  [quizData],
);

  const handleAnswerSelect = (answer: string) => {
    if (showMarkScheme) return;
    const correctAnswer = quizDataCopy[current].correct_answer;
    if (answer === correctAnswer) {
      setScore((prev) => prev + 1);
      navigator.vibrate?.(200);
    } else {
      setWrongSelect(answer);
      navigator.vibrate?.([200, 100, 200]);
    }
    setShowMarkScheme(true);
  };
  return (
    <>
      {" "}
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between px-5 mx-7 text-amber-300 text-xl font-bold">
          <p className="">Trial {current + 1}</p>
          <p>Runes acquired: {score}</p>
        </div>
        <div className="font-light m-7 p-5 text-amber-300 text-xl tracking-tight border shadow-2xl border-amber-900/20 bg-[#16191A]">
          {quizDataCopy[current].question}
        </div>
        <div className="border border-amber-900/20 shadow-2xl m-7 p-3 bg-[#16191A] ">
          {quizDataCopy[current].options.map(
            (answer: string, index: number) => (
              <AnswerOption
                answer={answer}
                onClick={() => handleAnswerSelect(answer)}
                key={index}
                isCorrect={answer === quizDataCopy[current].correct_answer}
                isWrong={wrongSelect === answer}
                showMarkScheme={showMarkScheme}
              />
            ),
          )}
        </div>
        <div className="flex justify-between">
          <button
            className="px-5 py-2  text-amber-400 text-sm tracking-widest uppercase font-bold cursor-pointer hover:text-red-600"
            onClick={() => {
              handleAbandon();
            }}
          >
            -- Abandon Quest --
          </button>
          <button
            className={`w-48 py-3 m-2 text-sm tracking-widest uppercase font-bold border border-amber-200/20  ${!showMarkScheme ? "cursor-not-allowed text-gray-400 bg-gray-200/20" : "  bg-amber-600/10 hover:bg-amber-600/20 transition-all text-amber-400 cursor-pointer"}`}
            onClick={handleNext}
            disabled={!showMarkScheme}
          >
            {!(current === 2) ? "next" : "end"}
          </button>
        </div>
      </div>
    </>
  );
};
