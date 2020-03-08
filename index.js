const express = require("express");

var app = express();

var port = proccess.env.PORT || 80;

app.use("/",express.static("./public"));

app.listen(port,()=>{
	console.log("Server ready");
});

console.log("Starting server....");