import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StarterQuizPage from './components/StarterQuizPage';
import MainQuizPage from './components/MainQuizPage';
import ResultPage from './components/ResultPage';

function App() {
  return (

    <Routes>
      <Route path="/" element={<StarterQuizPage />} />
      <Route path="/quiz" element={<MainQuizPage />} />
      <Route path="/result" element={<ResultPage />} />
    </Routes>

  );
}

export default App;