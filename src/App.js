//CSS
import './App.css';


//React
import { useCallback, useEffect, useState } from 'react';


// Importação dos dados 
import { wordsList }  from './data/words';

// Importação de componentes
import StartScren from './components/StartScren';
import Game from './components/Game';
import GameOver from './components/GameOver';


const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"},
]

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList)

  console.log(words)

  return (
    <div className="App">
      {gameStage === 'start' && <StartScren/>}
      {gameStage === 'game' && <Game/>}
      {gameStage === 'end' && <GameOver/>}
    </div>
  );
}

export default App;
