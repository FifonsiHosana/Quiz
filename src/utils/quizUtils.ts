import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const shuffler = (arr: string[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const randomNumber = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[randomNumber]] = [arr[randomNumber], arr[i]];
  }
  return arr;
};

export const checkStatus = (score: number): "win" | "loss" =>
  score > 1 ? "win" : "loss";

export const getStatsFromStorage = (): number[] => {
  const stored = localStorage.getItem("stats");
  if (!stored) return [];
  try {
    return JSON.parse(stored) as number[];
  } catch {
    return [];
  }
};

export const saveScoreToStorage = (score: number): void => {
  const existing = getStatsFromStorage();
  localStorage.setItem("stats", JSON.stringify([...existing, score]));
};

export const recommendationGenerator = () => {
  const myRecommendations = [
    [2, 3, 5, 6],
    [7, 9, 11, 12],
    [19, 21, 22, 23],
  ];
  return myRecommendations[Math.floor(Math.random() * 3)];
};

export const useSessionGuard = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams<{ sessionId: string }>();
  const savedToken = localStorage.getItem("QUIZ_TOKEN");

  useEffect(() => {
    if (!savedToken || sessionId !== savedToken) {
      navigate("/");
    }
  }, [navigate, savedToken, sessionId]);

  return sessionId ?? null;
};

export const recentCategories = () => {

  const stored = localStorage.getItem("category_history");
  const recent = stored ? JSON.parse(stored) : [];
  if (!recent) return "empty"
  const latestFour = recent.filter((index:number) => recent.indexOf(index) < 4);
  if (recent.length > 5){  
    localStorage.setItem("category_history", latestFour);
  }
  return latestFour;
}

export const formatCategoryName = (name: string): string =>
  name.replace(/^Entertainment:\s*/, "").replace(/^Science:\s*/, "");