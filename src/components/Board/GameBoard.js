import { useState } from "react";
import Keyboard from "./Keyboard";

const GameBoard = () => {

    const [guessBarText, setGuessBarText] = useState("");
    const [guesses, setGuesses] = useState([]);
    const [guessResult, setGuessResult] = useState("Spelling Bee");
    const todaysLetters = ['n', 'a', 'e', 'h', 'o', 'p', 'y'];
    
    const answers =  [   
        "aeon",
        "annoy",
        "anon",
        "anyhoo",
        "anyone",
        "apnea",
        "happen",
        "henna",
        "hone",
        "honey",
        "hyena",
        "hyphen",
        "naan",
        "nana",
        "nanny",
        "nape",
        "neap",
        "nene",
        "neon",
        "none",
        "noon",
        "nope",
        "open",
        "paean",
        "pane",
        "payphone",
        "peahen",
        "peen",
        "penne",
        "penny",
        "peon",
        "peony",
        "phone",
        "phono",
        "phony",
        "pone",
        "pony"
    ];

    const onGuessBarChange = (text) => {
        setGuessBarText(text);
    }

    const keyboardPressed = key => {
        setGuessBarText(guessBarText + key)
    }

    const clearKeyboard = () => {
        setGuessBarText("");
    }

    const deleteLetter = () => {
        setGuessBarText(guessBarText.substring(0, guessBarText.length-1))
    }

    const submitGuess = () => {

        if (guessBarText.length < 4) {
            console.log("Too Short!");
            setGuessResult("Too Short!");
        } else if (!guessBarText.includes(todaysLetters[0])) {
            console.log("Missing Key Letter")
            setGuessResult("Missing Key Letter");
        } else if (!answers.includes(guessBarText)) {
            console.log("Not A Valid Guess!");
            setGuessResult("Not A Valid Guess!");
        } else if (guesses.includes(guessBarText)) {
            console.log("Already Guessed!");
            setGuessResult("Already Guessed");
        } else { 
            console.log("GREAT!");
            setGuesses(prevState => [...prevState, guessBarText]);
            clearKeyboard();
            setGuessResult("GREAT!");
        }
       
    }

    return(
        <div>
            <h1>{ guessResult }</h1>

            <input
                type="text"
                id="guessBar" 
                value={ guessBarText }
                onChange={(event) => onGuessBarChange(event.target.value)}
                className="form-control text-gray-700 border border-solid border-yellow-300 focus:outline-none focus:border-yellow-400"
            />  
            
            <Keyboard 
                letters={ todaysLetters } 
                keyboardPressed={(keyPressed) => keyboardPressed(keyPressed)}  
            />
            
            <input 
                type="button"
                value="Delete"
                onClick={() => deleteLetter()}
                className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            />    

            <input 
                type="button"
                value="Clear"
                onClick={() => clearKeyboard()}
                className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            />    
        
            <input 
                type="button"
                value="Enter"
                onClick={() => submitGuess()}
                className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            />

        </div>
    );
}

export default GameBoard;