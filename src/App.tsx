import ChessTrainer from "./pages/ChessTrainer";
import "./App.css";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Navbar/>
      <ChessTrainer />
    </div>
  );
};

export default App;
