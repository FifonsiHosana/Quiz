import { BrowserRouter, Routes, Route } from "react-router-dom";
import QrFormPage from "./pages/QrFormPage";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import StatsPage from "./pages/StatsPage";
import { AppProviders } from "./contexts/AppProviders";

function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QrFormPage />} />
          <Route path="/home/:sessionId" element={<HomePage />} />
          <Route path="/quiz/:sessionId" element={<QuizPage />} />
          <Route path="/stats/:sessionId" element={<StatsPage />} />
        </Routes>
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;