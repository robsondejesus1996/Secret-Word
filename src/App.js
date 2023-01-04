//CSS
import "./App.css";

//React
import { useCallback, useEffect, useState } from "react";

// Importação dos dados
import { wordsList } from "./data/words";

// Importação de componentes
import StartScren from "./components/StartScren";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];



function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState("");

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(() => {
    //pick a random caterogy
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];


    //pick a random word
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];


    return { word, category };
  }, [words]);

  //start the secret word game
  const startGame = useCallback(() => {
    // clear all letters
    clearLetterStates();
    //função para pick e caterory
    const { word, category } = pickWordAndCategory();

    //pegar a palavra e transformar em letras
    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l) => l.toLowerCase());

  

    //setar os estados
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  //Função para processar os inputs
  const verifyLetter = (letter) => {
    //normalizar para letra miniscula
    const normalizedLetter = letter.toLowerCase();

    //validação se a letra ja foi utilizada
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    //Incluir as letra que o usuario adivinha para as letras acertadas ou erradas 
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        letter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  const clearLetterStates = () =>{
    setGuessedLetters([])
    setWrongLetters([])
  }

  //verificar se as tentativas terminaram

  useEffect(() =>{
    if(guesses <= 0){

      //reset all states 
      clearLetterStates();

      //mudanca de estagio 
      setGameStage(stages[2].name)
    }
  }, [guesses])


  useEffect(() =>{

    const uniqueLetters = [... new Set(letters)]

    if(guessedLetters.length === uniqueLetters.length){
      // adicionar o score
      setScore((actualScore) => actualScore +=100)

      //reset game with new word 
      startGame()

    }


  }, [guessedLetters, letters, startGame])

  // restarts the game
  const retry = () => {

    setScore(0);
    setGuesses(3);
    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScren startGame={startGame} />}
      {gameStage === "game" && (
        <Game
        verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} score={score}/>}
    </div>
  );
}

export default App;
