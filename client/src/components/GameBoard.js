import { useEffect, useRef, useState } from "react";
import Keyboard from "./Keyboard";
import Answers from "./Answers";

const GameBoard = () => {

    const [guessBarText, setGuessBarText] = useState("");
    const [wordsFound, setWordsFound] = useState([]);
    const [guessResult, setGuessResult] = useState("");
    const [todaysLetters, setTodaysLetters] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [points, setPoints] = useState(0);
    const [showAnswers, setShowAnswers] = useState(false);
    const [answerBtnText, setAnswerBtnText] = useState("Show Answers");
    const guessInput = useRef(null);
    
    async function getGameData() {
        
       fetch('http://localhost:8181/')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setTodaysLetters([...data.keyLetters, ...data.letters]);
                setAnswers(data.answers);
            });
        

    }

    useEffect(() => {
        getGameData();
        //setTodaysLetters(Data.letters);
        //setAnswers(Data.answers);
        guessInput.current.focus();
    }, []);

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
        setGuessBarText(guessBarText.substring(0, guessBarText.length-1));
    }

    const toggleShowAnswers = () => {
        setShowAnswers(!showAnswers);
        if (showAnswers) 
            setAnswerBtnText("Show Answers");
        else
            setAnswerBtnText("Hide Answers");
    }

    const calculatePoints = word => {
        let points = 0;

        if (word.length === 4) {
            points += 1;
        } else if (word.length > 4) {
            points += word.length;
        }

        let containsAll = true;
        for (let i = 0; i < todaysLetters.length; i++) {
            if (!word.includes(todaysLetters[i])) {
                containsAll = false;
                break;
            }
        } 

        if (containsAll)
            points += 7;

        return points;
    }

    const evaluateGuess = (event) => {
        if (event)
            event.preventDefault();

        if (guessBarText.length < 4) {
            setGuessResult("Too Short!");
        } else if (!guessBarText.includes(todaysLetters[0])) {
            setGuessResult("Missing Key Letter");
        } else if (!answers.includes(guessBarText)) {
            setGuessResult("Not A Valid Guess!");
        } else if (wordsFound.includes(guessBarText)) {
            setGuessResult("Already Guessed");
        } else { 
            setWordsFound(prevState => [...prevState, guessBarText]);
            const pointsToAdd = calculatePoints(guessBarText);
            setGuessResult("+" + pointsToAdd + " point(s)");
            setPoints(points + calculatePoints(guessBarText));
        }
        clearKeyboard();
    }

    return(
        <div className="text-center">

            <div className="mt-6">
                <form onSubmit={evaluateGuess}>
                    <input
                        type="text"
                        id="guessBar" 
                        value={ guessBarText }
                        placeholder="Type or click"
                        ref={ guessInput }
                        onChange={(event) => onGuessBarChange(event.target.value)}
                        className="form-control text-2xl p-2 text-gray-700 rounded-lg uppercase border-yellow-300 border-b-2 text-center focus:outline-none"
                    />  
                </form>
            </div>

            <h1>{ guessResult }</h1>

            <div className="my-6">
            <Keyboard 
                letters={ todaysLetters } 
                keyboardPressed={(keyPressed) => keyboardPressed(keyPressed)}  
            />
            </div>

            <div className="my-6">
                <input 
                    type="button"
                    value="Delete"
                    onClick={() => deleteLetter()}
                    className="px-8 py-3 m-2 bg-red-300 text-black border border-black font-medium text-xs uppercase rounded-lg hover:bg-red-400 hover:drop-shadow-md cursor-pointer"
                />    
                <input 
                    type="button"
                    value="Enter"
                    onClick={() => evaluateGuess()}
                    className="px-8 py-3 m-2 bg-green-200 text-black border border-black font-medium text-xs uppercase rounded-lg hover:bg-green-300 hover:drop-shadow-md cursor-pointer"
                />
                <input 
                    type="button"
                    value="Clear"
                    onClick={() => clearKeyboard()}
                    className="px-8 py-3 m-2 bg-transparent text-black border border-black font-medium text-xs uppercase rounded-lg hover:bg-slate-200 hover:drop-shadow-md cursor-pointer"
                />    
            
            </div>

            <p>Points: { points }</p>
            <p>Words Found: { wordsFound.length }/{ answers.length }</p>
        
            <ul>
            {wordsFound.map((word => (
                <li key={ word }>{ word }</li>
            )))}
            </ul>

            <button onClick={toggleShowAnswers} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{ answerBtnText }</button>
            <ul className={showAnswers ? "block" : "hidden"}>
                <Answers answers={answers} wordsFound={wordsFound} />
            </ul>
        </div>
    );
}

export default GameBoard;