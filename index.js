const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const countries_for_equality_statsAPI = require(path.join(__dirname,"countries_for_equality_stats"));

const port = process.env.PORT || 80;

const app = express();
app.use(bodyParser.json());
console.log("Running module...");

countries_for_equality_statsAPI(app);

app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");









