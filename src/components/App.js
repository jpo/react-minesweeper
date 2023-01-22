import { GameProvider } from "./GameContext";
import Difficulty from "./Difficulty";
import Minefield from "./Minefield";
import Toolbar from "./Toolbar";
import "./App.css";

function App() {
  return (
    <GameProvider difficulty={0}>
      <div id="app">
        <h1 id="title">React Minesweeper</h1>
        <div id="game">
          <Toolbar />
          <Minefield />
          <Difficulty />
        </div>
      </div>
    </GameProvider>
  );
}

export default App;
