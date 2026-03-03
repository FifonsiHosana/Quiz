import axios from "axios";
const TRIVIA_DB_BASEURL = "https://opentdb.com/";

export const generateNewSession = async () => {
  const res = await axios.get(
    TRIVIA_DB_BASEURL + "api_token.php?command=request",
  );
  const token = res.data.token; // this should be saved to local storage
  localStorage.setItem("QUIZ_TOKEN", token);
  return token;
};

export const getQuizData = async (category: number, sessionId:string) => {
  // let token = localStorage.getItem("QUIZ_TOKEN");

  // if (!token) {
  //   token = await generateNewSession();
  // }

  const res = await axios.get(
    `${TRIVIA_DB_BASEURL}api.php?amount=3&category=${category}&token=${sessionId}`,
  );

  // if (res.data.response_code === 3 || res.data.response_code === 4) {
  //   token = await generateNewSession();
  //   const retry = await axios.get(
  //     `${TRIVIA_DB_BASEURL}api.php?amount=3&category=${category}&token=${token}`,
  //   );
  //   return retry.data;
  // }

  console.log(res.data.results);

  return res;
};

export const getCategories = async () => {
  const res = await axios.get(`${TRIVIA_DB_BASEURL}api_category.php`);
  return res.data.trivia_categories;
};
