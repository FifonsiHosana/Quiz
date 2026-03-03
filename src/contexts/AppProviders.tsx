import { useState, type ReactNode } from "react";
import { QuizDataContext, CategoryContext,LoadingContext }  from "./Index"
import type { QuizQuestion } from "../types/Index";

// Generic helper to safely read from localStorage
const loadFromStorage = <T,>(key: string, fallback: T): T => {
  const stored = localStorage.getItem(key);
  if (!stored) return fallback;
  try {
    return JSON.parse(stored) as T;
  } catch {
    return fallback;
  }
};

export const AppProviders = ({ children }: { children: ReactNode }) => {
  const [quizData, setQuizData] = useState<QuizQuestion[]>(() =>
    loadFromStorage<QuizQuestion[]>("quiz", []),
  );

  const [previousCategory, setPreviousCategory] = useState<number>(() =>
    loadFromStorage<number>("category_id", 11),
  );

  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      <CategoryContext.Provider
        value={{ previousCategory, setPreviousCategory }}
      >
        <QuizDataContext.Provider value={{ quizData, setQuizData }}>
          {children}
        </QuizDataContext.Provider>
      </CategoryContext.Provider>
    </LoadingContext.Provider>
  );
};
