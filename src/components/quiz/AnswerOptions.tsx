type Props = {
  answer: string;
  isCorrect: boolean;
  isWrong: boolean;
  showMarkScheme: boolean;
  onClick: () => void;
};

const AnswerOption = ({
  answer,
  isCorrect,
  isWrong,
  showMarkScheme,
  onClick,
}: Props) => {

  return (
    <div
      onClick={onClick}
      className={`${showMarkScheme ? ( isCorrect ? "bg-green-500" : "") : "hover:text-amber-300 cursor-pointer"} ${isWrong && "bg-red-500"}  m-7   text-amber-100   bg-amber-500`}
    >
      <div
        className={`border border-amber-900/20 p-3 bg-[#3a3a3a] ${showMarkScheme ? (isCorrect ? "bg-green-700 ml-1 " : "") : "hover:ml-0.5 cursor-pointer"} ${isWrong && "bg-red-700 ml-1"}`}
      >
        {answer}
      </div>
    </div>
  );
};

export default AnswerOption;
