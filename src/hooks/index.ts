import { useContext } from "react";
import { CategoryContext, LoadingContext } from "../contexts/Index";
import { QuizDataContext } from "../contexts/Index";

export const useCategory = () => {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error("useQuizData must be used inside QuizDataContext.Provider");
  }

  return context;
};

export const useQuizData = () => {
  const context = useContext(QuizDataContext);

  if (!context) {
    throw new Error("useQuizData must be used inside QuizDataContext.Provider");
  }

  return context;
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) throw new Error("useLoading must be used inside AppProviders");
  return context;
};
