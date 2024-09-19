import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginSignup from "./pages/LoginSignup";
import HomePage from "./pages/HomePage";
import InterviewDetail from "./pages/InterviewDetail";
import MCQPage from "./pages/MCQPage";
import CodingRoundPage from "./pages/CodingRoundPage";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/interview/:id" element={<InterviewDetail />} />
          <Route path="/mcq" element={<MCQPage />} />
          <Route path="/coding-round" element={<CodingRoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
