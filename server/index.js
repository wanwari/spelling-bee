import fetch from "node-fetch";
import express, { response } from "express";
import cors from "cors";

const app = express();
app.use(cors());

/*
 * Parse HTML from nytbee.com to extract various information
 * Could use a library but where's the fun in that
 */
const getGameData = (html) => {
	const htmlAnswerList = html.substring(
		html.indexOf('<ul class="column-list">'),
		html.indexOf("</ul>")
	);

	const answers = getAnswers(htmlAnswerList);
	const pangram = getPangram(htmlAnswerList);
	const keyLetter = getKeyLetter(html);
	const gameLetters = getGameLetters(pangram, keyLetter);
	const scoringTable = getScoringTable(html);
	const hints = Object.fromEntries(
		getTwoLetterList(answers, [keyLetter, ...gameLetters])
	);
	const gameData = {
		letters: gameLetters,
		keyLetters: keyLetter,
		pangram: pangram,
		answers: answers,
		scoringTable: scoringTable,
		hints: hints,
	};

	return gameData;
};

/*
 * Remove the HTML tags and place the words into an array
 */
const getAnswers = (htmlAnswerList) => {
	//https://stackoverflow.com/a/24350326
	const htmlRemovedAnswerList = htmlAnswerList
		.replace(/<[^>]*>/g, " ")
		.replace(/\s{2,}/g, " ")
		.trim();

	const answers = htmlRemovedAnswerList.split(" ");

	return answers;
};

/*
 * Substring through the HTML source to find the JS code that contains the canvas for the
 * 'Center Letter Frequency. Then go through that canvas to find the highlighted letter
 * for todays letter.
 */
const getKeyLetter = (data) => {
	const dataSubS = data.substring(0, data.indexOf('"plotX":["a"') - 2);
	const colours = dataSubS.substring(dataSubS.length - 261);
	const coloursArray = colours.replace(/\"/g, "").split(",");
	const keyLetter = String.fromCharCode(
		coloursArray.indexOf("firebrick") + 97
	);

	return keyLetter;
};

/*
 * Get the pangram for todays riddle
 * The pangram is the element surrounded by the <strong> tag
 */
const getPangram = (htmlAnswerList) => {
	const panagram = htmlAnswerList.substring(
		htmlAnswerList.indexOf("<strong>") + 8,
		htmlAnswerList.indexOf("</strong")
	);

	return panagram;
};

/*
 * Use the pangram to find the game letters
 * The pangram contains each letter (could be duplicate) so just take each letter
 * Removes the key letter from array
 */
const getGameLetters = (pangram, keyLetter) => {
	let gameLetters = [];
	for (let i = 0; i < pangram.length; i++) {
		if (!gameLetters.includes(pangram[i]) && pangram[i] != keyLetter)
			gameLetters.push(pangram[i]);
	}

	return mixGameLetters(gameLetters);
};

const mixGameLetters = (gameLetters) => {
	for (var i = gameLetters.length - 1; i > 0; i--) {
		const ran = Math.floor(Math.random() * (i + 1));
		[gameLetters[i], gameLetters[ran]] = [gameLetters[ran], gameLetters[i]];
	}
	return gameLetters;
};

const getMaxPoints = (html) => {
	const dataSubS = html.substring(html.indexOf("Maximum Puzzle Score"));
	const scoreStart = dataSubS.substring(dataSubS.indexOf(":") + 2);
	const score = scoreStart.substring(0, scoreStart.indexOf("<"));
	return parseInt(score);
};

const getScoringTable = (html) => {
	const maxPoints = getMaxPoints(html);

	const scoringTable = {
		beginner: 0,
		goodStart: Math.round(maxPoints * 0.02),
		movingUp: Math.round(maxPoints * 0.05),
		good: Math.round(maxPoints * 0.08),
		solid: Math.round(maxPoints * 0.15),
		nice: Math.round(maxPoints * 0.25),
		great: Math.round(maxPoints * 0.4),
		amazing: Math.round(maxPoints * 0.5),
		genius: Math.round(maxPoints * 0.7),
		queenBee: maxPoints,
	};
	return scoringTable;
};

/*
 * Count the number of occurances of every two letter
 * starting combos for all the answers
 */
const getTwoLetterList = (answers, gameLetters) => {
	const twoLetterHints = new Map();

	for (let i = 0; i < answers.length; i++) {
		const currentLetters = answers[i].charAt(0) + answers[i].charAt(1);
		if (twoLetterHints.get(currentLetters)) {
			twoLetterHints.set(
				currentLetters,
				twoLetterHints.get(currentLetters) + 1
			);
		} else {
			twoLetterHints.set(currentLetters, 1);
		}
	}
	return twoLetterHints;
};

app.get("/", (req, res) => {
	const url = "https://nytbee.com";
	fetch(url)
		.then((response) => response.text())
		.then((data) => res.json(getGameData(data)));
});

const server = app.listen(process.env.PORT || 8181, () => {
	console.log("[index.js] Listening at " + server.address().port);
});
