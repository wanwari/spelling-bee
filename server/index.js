const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Hello World");
});

const server = app.listen(8181, () => {
    console.log("[index.js] Listening at " + server.address().port);
});