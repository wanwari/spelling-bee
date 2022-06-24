import { useEffect, useRef, useState } from "react";
import Keyboard from "./Keyboard";
import Answers from "./Answers";
import ControlButtons from "./ControlButtons";
import Score from './Score';

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
        
       fetch('https://spelling-bee1.herokuapp.com/')
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
            setWordsFound(prevState => [guessBarText, ...prevState]);
            const pointsToAdd = calculatePoints(guessBarText);
            setGuessResult("+" + pointsToAdd + " point(s)");
            setPoints(points + calculatePoints(guessBarText));
        }
        clearKeyboard();
    }

    return(
        <div className="text-center grid justify-items-center">

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

            <Keyboard 
                letters={ todaysLetters } 
                keyboardPressed={(keyPressed) => keyboardPressed(keyPressed)}  
            />

            <ControlButtons
                deleteLetter={() => deleteLetter()} 
                evaluateGuess={() => evaluateGuess()} 
                clearKeyboard={() => clearKeyboard()} />

            <Score points={points} />

            { wordsFound.length > 0 &&
                <div className="w-2/5 md:w-1/4">
                    <p>Words Found: { wordsFound.length }/{ answers.length }</p>
                
                    <div className="h-24 overflow-scroll m-2 p-2 bg-yellow-200">
                        <ul>
                        {wordsFound.map((word => (
                            <li key={ word }>{ word }</li>
                        )))}
                        </ul>
                    </div>
                </div>
            }       

            <button onClick={toggleShowAnswers} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{ answerBtnText }</button>
            <div className="w-2/5 md:w-1/4 h-72 m-2 overflow-scroll">
                <ul className={showAnswers ? "block" : "hidden"}>
                    <Answers answers={answers} wordsFound={wordsFound} />
                </ul>
            </div>
        </div>
    );
}

export default GameBoard;