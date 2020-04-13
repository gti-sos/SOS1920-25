const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const global_competitiveness_indexAPI = require(path.join(__dirname+"/global_competitiveness_index"));
const port = process.env.PORT || 80;

const app = express();
app.use(bodyParser.json());
global_competitiveness_indexAPI(app);

app.listen(port, () => {
    console.log("Server ready");
});

console.log("Starting server...");