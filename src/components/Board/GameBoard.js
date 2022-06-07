import { useState } from "react";
import Keyboard from "./Keyboard";

const GameBoard = props => {

    const [guessBarText, setGuessBarText] = useState("");
    const onGuessBarChange = (text) => {
        setGuessBarText(text);
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
            
            <Keyboard letters={['a', 'c', 'd', 'm', 'r', 't']} />

        </div>
    );
}

export default GameBoard;