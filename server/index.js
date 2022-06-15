import fetch from 'node-fetch';
import express from 'express';

const app = express();

/*
* Parse HTML from nytbee.com to extract various information
* Could use a library but where's the fun in that
*/
const parseText = data => {

    const htmlAnswerList = data.substring(data.indexOf("<ul class=\"column-list\">"), data.indexOf("</ul>"))

    //https://stackoverflow.com/a/24350326
    const htmlRemovedAnswerList = htmlAnswerList.replace(/<[^>]*>/g, ' ')
        .replace(/\s{2,}/g, ' ')
        .trim();

    const answers = htmlRemovedAnswerList.split(" ");
    console.log(answers);

}

app.get("/", (req, res) => {
    const url = "https://nytbee.com/";
    fetch(url)
        .then(response => response.text())
        .then(data => parseText(data));
});

const server = app.listen(8181, () => {
    console.log("[index.js] Listening at " + server.address().port);
});