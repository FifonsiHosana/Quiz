export type  QuizQuestion = {
  category: string;
  correct_answer: string;
  difficulty: "easy" | "medium" | "hard";
  incorrect_answers: string[];
  question: string;
  type: "multiple" | "boolean";
}

export type  QuizQuestionDisplay = {
  category: string;
  correct_answer: string;
  options: string[];
  question: string;
}

export type  Category =  {
  id: number;
  name: string;
}

export type  GameStats = {
  scores: number;
}

export type StateSetter = (value: number | ((prev: number) => number)) => void;

export type QuizMainProps = {
  setCurrent: StateSetter
  current: number;
  score: number;
  setScore: StateSetter
};