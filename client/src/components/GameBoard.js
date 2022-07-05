import { useEffect, useRef, useState } from "react";
import Keyboard from "./Keyboard";
import Answers from "./Answers";
import ControlButtons from "./ControlButtons";
import Score from "./Score";
import GuessBar from "./GuessBar";
import WordsFound from "./WordsFound";
import Rules from "./Rules";
import Cookies from "js-cookie";
import ScoringRankings from "./ScoringRankings";

const GameBoard = () => {
	const [guessBarText, setGuessBarText] = useState("");
	const [wordsFound, setWordsFound] = useState([]);
	const [guessResult, setGuessResult] = useState("");
	const [todaysLetters, setTodaysLetters] = useState([]);
	const [answers, setAnswers] = useState([]);
	const [scoringTable, setScoringTable] = useState({});
	const [points, setPoints] = useState(0);
	const guessInput = useRef(null);

	async function getGameData() {
		fetch("https://spelling-bee1.herokuapp.com/")
			.then((response) => response.json())
			.then((data) => {
				setTodaysLetters([...data.keyLetters, ...data.letters]);
				setAnswers(data.answers);
				setScoringTable(data.scoringTable);
			});
	}

	useEffect(() => {
		getGameData();
		guessInput.current.focus();
		if (Cookies.get("wordsFoundCookie"))
			setWordsFound(Cookies.get("wordsFoundCookie").split(","));

		if (Cookies.get("pointsCookie")) {
			setPoints(parseInt(Cookies.get("pointsCookie")));
		}
	}, []);

	const onGuessBarChange = (text) => {
		setGuessBarText(text);
	};

	const keyboardPressed = (key) => {
		setGuessBarText(guessBarText + key);
	};

	const clearKeyboard = () => {
		setGuessBarText("");
	};

	const deleteLetter = () => {
		setGuessBarText(guessBarText.substring(0, guessBarText.length - 1));
	};

	const shuffleKeyboard = () => {
		let tmpLetters = [...todaysLetters];
		const todaysKey = todaysLetters[0];

		for (var i = tmpLetters.length - 1; i > 0; i--) {
			const ran = Math.floor(Math.random() * (i + 1));
			[tmpLetters[i], tmpLetters[ran]] = [tmpLetters[ran], tmpLetters[i]];
		}

		let keyLetterPosition = tmpLetters.indexOf(todaysKey);

		[tmpLetters[0], tmpLetters[keyLetterPosition]] = [
			tmpLetters[keyLetterPosition],
			tmpLetters[0],
		];
		setTodaysLetters(tmpLetters);
	};

	const calculatePoints = (word) => {
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

		if (containsAll) points += 7;

		return points;
	};

	const evaluateGuess = (event) => {
		if (event) event.preventDefault();

		if (guessBarText.length < 4) {
			setGuessResult("Too Short!");
		} else if (!guessBarText.includes(todaysLetters[0])) {
			setGuessResult("Missing Key Letter");
		} else if (!answers.includes(guessBarText)) {
			setGuessResult("Not A Valid Guess!");
		} else if (wordsFound.includes(guessBarText)) {
			setGuessResult("Already Guessed");
		} else {
			setWordsFound((prevState) => [guessBarText, ...prevState]);
			const pointsToAdd = calculatePoints(guessBarText);
			setGuessResult("+" + pointsToAdd + " point(s)");
			setPoints(points + calculatePoints(guessBarText));
			Cookies.set("wordsFoundCookie", [guessBarText, ...wordsFound], {
				path: "/",
				secure: true,
			});
			Cookies.set(
				"pointsCookie",
				points + calculatePoints(guessBarText),
				{
					path: "/",
					secure: true,
				}
			);
		}
		clearKeyboard();
	};

	return (
		<div className="text-center grid justify-items-center">
			<GuessBar
				evaluateGuess={(event) => evaluateGuess(event)}
				guessBarText={guessBarText}
				guessInput={guessInput}
				onGuessBarChange={(text) => onGuessBarChange(text)}
			/>

			<Keyboard
				letters={todaysLetters}
				keyboardPressed={(keyPressed) => keyboardPressed(keyPressed)}
			/>

			<ControlButtons
				deleteLetter={() => deleteLetter()}
				evaluateGuess={() => evaluateGuess()}
				clearKeyboard={() => clearKeyboard()}
				shuffleKeyboard={() => shuffleKeyboard()}
			/>

			<Score points={points} guessResult={guessResult} />

			<WordsFound wordsFound={wordsFound} answers={answers} />

			<ScoringRankings
				currentScore={points}
				scoringTable={scoringTable}
			/>

			<Answers answers={answers} wordsFound={wordsFound} />

			<Rules />
		</div>
	);
};

export default GameBoard;
