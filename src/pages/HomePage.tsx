import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories, getQuizData } from "../services/triviaApi";
import { recommendationGenerator, useSessionGuard } from "../utils/quizUtils";
import { useCategory, useLoading, useQuizData } from "../hooks";
import Spinner from "../components/Spinner";
import CategoryCard from "../components/home/CategoryCard";

const HomePage = () => {
  const sessionId = useSessionGuard();

  const navigate = useNavigate();
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    [],
  );
  const { setQuizData } = useQuizData();
  const { setPreviousCategory } = useCategory();
  const { setIsLoading } = useLoading();

  const stored = localStorage.getItem("category_history");
  const recents = stored ? JSON.parse(stored) : [];

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategories();
      setCategories(res);
    };
    fetchCategories();
  }, []);

  const handleCategorySelect = async (id: number) => {
    if (!sessionId) return;
    setIsLoading(true);
    setQuizData([]);
    try {
      const res = await getQuizData(id, sessionId);
      setQuizData(res.data.results);
      localStorage.setItem("quiz", JSON.stringify(res));
      setPreviousCategory(id);
      localStorage.setItem("category_id", JSON.stringify(id));
      navigate(`/quiz/${sessionId}`);
    } catch {
      navigate("/");
    } finally {
      setIsLoading(false);
    }

    const updatedRecents = [id, ...recents];
    localStorage.setItem("category_history", JSON.stringify(updatedRecents));/////////
  };

  const recommendations = useMemo(() => {
    if (!categories.length) return [];
    return recommendationGenerator()
      .map((i) => categories[i])
      .filter(Boolean);
  }, [categories]);

  return (
    <div className="bg-[#13201f] h-screen overflow-scroll tracking-wide ">
      <div className="bg-[#16191A]  mb-5 p-5">
        <p className="text-white font-bold text-3xl text-center uppercase mt-5">
          Choose a category
        </p>
        <p className="text-amber-200/50 mt-5 mx-8">Dev's Recommendations</p>
        <div className="grid md:grid-cols-4 p-10 text-center">
          {categories.length !== 0 &&
            recommendations.map((recommendation) => (
              <CategoryCard
                key={recommendation.id}
                onClick={() => handleCategorySelect(recommendation.id)}
                name={recommendation.name}
              />
            ))}
        </div>
      </div>
      <div
        className={` ${categories.length == 0 ? "flex justify-center items-center w-full h-90" : "grid md:grid-cols-4 grid-cols-2 p-10 text-center"}`}
      >
        {categories.length !== 0 ? (
          categories.map((category) => (
            <CategoryCard
              key={category.id}
              name={category.name}
              onClick={() => handleCategorySelect(category.id)}
            />
          ))
        ) : (
          <Spinner label="conjuring categories..." />
        )}
      </div>
    </div>
  );
};

export default HomePage;
