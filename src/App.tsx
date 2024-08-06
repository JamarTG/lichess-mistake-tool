import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChessTrainer from "./pages/ChessTrainer";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import "./App.css";
import GameParamsSetter from "./pages/GameParams/index.tsx";

const App = () => {
  return (
    <Router>
      <div className="h-full flex flex-col">
        <Navbar />
        <div className="flex-grow flex justify-center items-center">
          <Routes>
            <Route path="/" element={<GameParamsSetter />} />
            <Route path="/trainer" element={<ChessTrainer />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
