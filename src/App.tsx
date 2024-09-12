import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import "./App.css";
import Main from "./pages/Main/index.tsx";

const App = () => {
  return (
    <Router>
      <div className="h-full lg:h-screen flex flex-col p-6">
        <Navbar />
        <div className="flex-grow flex justify-center items-center">
          <Routes>
            <Route path="/" element={<Main />} />
            {/* <Route path="/trainer" element={<ChessTrainer />} /> */}
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
