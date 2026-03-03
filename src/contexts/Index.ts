import { createContext, type Dispatch, type SetStateAction } from "react";
import type { QuizQuestion } from "../types/Index";

type QuizContextType = {
  quizData: QuizQuestion[];
  setQuizData: Dispatch<SetStateAction<QuizQuestion[]>>;
}

type CategoryContextType = {
  previousCategory: number;
  setPreviousCategory: Dispatch<SetStateAction<number>>;
}

type LoadingContext = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const LoadingContext = createContext<LoadingContext | null>(null);
export const QuizDataContext = createContext<QuizContextType | null>(null);
export const CategoryContext = createContext<CategoryContextType | null>(null);