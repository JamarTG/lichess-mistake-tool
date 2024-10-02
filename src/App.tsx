import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import "./App.css";
import Main from "./pages/Main/index.tsx";
// import ChessTrainer from "./pages/ChessTrainer/index.tsx";

const App = () => {
  return (
    <div>
      <Navbar />;
      <Main/>
    </div>
  );
};

export default App;
