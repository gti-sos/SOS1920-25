const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const happiness_rateAPI = require(path.join(__dirname,"happiness_rate"));

const port = process.env.PORT || 80;

const app = express();
app.use(bodyParser.json());

app.use("/",express.static("./public"));
 
console.log("Running module...");

happiness_rateAPI(app);

app.listen(port, () => {
    console.log("Server ready");
});

console.log("Starting server...");