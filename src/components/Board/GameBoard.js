import { useState } from "react";
import Keyboard from "./Keyboard";

const GameBoard = () => {

    const [guessBarText, setGuessBarText] = useState("");

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

    return(
        <div>
            <h1>Board.js</h1>

            <input
                type="text"
                id="guessBar" 
                value={ guessBarText }
                onChange={(event) => onGuessBarChange(event.target.value)}
                className="form-control text-gray-700 border border-solid border-yellow-300 focus:outline-none focus:border-yellow-400"
            />  
            
            <Keyboard 
                letters={['a', 'c', 'd', 'm', 'r', 't']} 
                keyboardPressed={(keyPressed) => keyboardPressed(keyPressed)}  
            />
            
            <input 
                type="button"
                value="Delete"
                onClick={() => deleteLetter()}
            />    

            <input 
                type="button"
                value="Clear"
                onClick={() => clearKeyboard()}
            />    
        </div>
    );
}

export default GameBoard;