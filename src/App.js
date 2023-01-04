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



  //start the secret word game
  const startGame = () =>{
    setGameStage(stages[1].name)
  }

  //Função para processar os inputs 
  const verifyletter = () =>{
    setGameStage(stages[2].name);
  }

  // restarts the game 
  const retry = () =>{
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartScren startGame={startGame}/>}
      {gameStage === 'game' && <Game verifyletter={verifyletter}/>}
      {gameStage === 'end' && <GameOver retry={retry}/>}
    </div>
  );
}

export default App;
