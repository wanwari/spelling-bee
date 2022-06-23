import fetch from 'node-fetch';
import express from 'express';

const app = express();

/*
* Parse HTML from nytbee.com to extract various information
* Could use a library but where's the fun in that
*/
const getGameData = html => {

    const htmlAnswerList = html.substring(html.indexOf("<ul class=\"column-list\">"), html.indexOf("</ul>"))
   
    const answers = getAnswers(htmlAnswerList);
    const pangram = getPangram(htmlAnswerList);
    const keyLetter = getKeyLetter(html);
    const gameLetters = getGameLetters(pangram, keyLetter)

    const gameData = {
        letters: gameLetters,
        keyLetters: keyLetter,
        pangram: pangram,
        answers: answers
    };

    return gameData;
}

/*
 * Remove the HTML tags and place the words into an array
*/
const getAnswers = htmlAnswerList => {

    //https://stackoverflow.com/a/24350326
    const htmlRemovedAnswerList = htmlAnswerList.replace(/<[^>]*>/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();

    const answers = htmlRemovedAnswerList.split(" ");

    return answers;
}

/*
 * Substring through the HTML source to find the JS code that contains the canvas for the
 * 'Center Letter Frequency. Then go through that canvas to find the highlighted letter 
 * for todays letter.
*/
const getKeyLetter = data => {

    const dataSubS = data.substring(0, data.indexOf("\"plotX\":[\"a\"")-2);
    const colours = dataSubS.substring(dataSubS.length - 261);
    const coloursArray = colours.replace(/\"/g, "").split(",");
    const keyLetter = String.fromCharCode(coloursArray.indexOf("firebrick") + 97);

    return keyLetter;
}

/*
 * Get the pangram for todays riddle
 * The pangram is the element surrounded by the <strong> tag
*/
const getPangram = htmlAnswerList => {

    const panagram= htmlAnswerList.substring(htmlAnswerList.indexOf("<strong>") + 8, htmlAnswerList.indexOf("</strong"));

    return panagram;
}

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
}

const mixGameLetters = gameLetters => {

    for (var i = gameLetters.length - 1; i > 0; i--) {
        const ran = Math.floor(Math.random() * (i + 1));
        [gameLetters[i], gameLetters[ran]] = [gameLetters[ran], gameLetters[i]];
    }
    return gameLetters;
}

app.get("/", (req, res) => {

    const url = "https://nytbee.com";
    fetch(url)
        .then(response => response.text())
        .then(data => res.json(getGameData(data)));

});

const server = app.listen(8181, () => {
    console.log("[index.js] Listening at " + server.address().port);
});