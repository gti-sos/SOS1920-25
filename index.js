const express = require("express");
const bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

var port = process.env.PORT || 80;

app.use("/",express.static("./public"));

var countries = [
	{ 
		country: "spain",
		year:     2019,
		happinesRanking: 30,
		happinessRate: 6.365,
		var: 0.7
	},
	{ 
		country: "germany",
		year:     2019,
		happinesRanking: 17,
		happinessRate: 6.985,
		var: 0.29	
	}
];



const BASE_API_URL = "/api/v1";

// GET COUNTRIES

app.get(BASE_API_URL+"/countriesforhappiness", (req,res) =>{
	res.send(JSON.stringify(countries,null,2));
});


// POST COUNTRIES

app.post(BASE_API_URL+"/countriesforhappiness",(req,res) =>{
	
	var NewCountry = req.body;
	
	if(NewCountry.country == null || NewCountry.country == ""){
		res.sendStatus(400,"BAD REQUEST")
	}else{
		countries.push(NewCountry);
		res.sendStatus(201,"CREATED");
	}
	
});

// DELETE COUNTRIES
app.delete(BASE_API_URL+"/countriesforhappiness", (req,res) =>{
	 
	var emptyContries =[];
	
	if(countries.length > 0){
		countries = emptyContries;
		res.sendStatus(200,"OK");
	}else{
		res.sendStatus(405,"METHOD NOT ALLOWED");
	}	
});
//PUT COUNTRIES
app.put(BASE_API_URL+"/countriesforhappiness", (req,res)=>{
	res.sendStatus(405,"METHOD NOT ALLOWED");
});

//POST COUNTRIES/XXX
app.post(BASE_API_URL+"/countriesforhappiness/:country",(req,res) =>{
	res.sendStatus(405,"METHOD NOT ALLOWED");
});
// GET COUNTRIES/XXX
app.get(BASE_API_URL+"/countriesforhappiness/:country",(req,res)=>{
	
	var  country = req.params.country;
	
	var filteredCountries = countries.filter((c)=>{
		return(c.country == country);
	});
	
	if(filteredCountries.length >= 1){
		res.send(filteredCountries[0]);
	}else{
		res.sendStatus(404,"COUNTRY NOT FOUND")
	}

});
// PUT COUNTRY/XXX
app.put(BASE_API_URL+"/countriesforhappiness/:country",(req,res)=>{
	var  country = req.params.country;
	var UpdatedCountry = req.body;
	var found = false;
	
	var UpdatedCountries = countries.map((c)=>{
		if(c.country == country){
			found = true;
			return UpdatedCountry;
		}else{
			return c;
		}
		
	});
	
	if(found == false){
		res.sendStatus(400,"BAD REQUEST")
	}else{
		countries = UpdatedCountries;
		res.sendStatus(200,"OK");
	}
	
});
// DELETE COUNTRY/XXX
app.delete(BASE_API_URL+"/countriesforhappiness/:country",(req,res)=>{
	
	var  country = req.params.country;
	
	var filteredCountries = countries.filter((c)=>{
		return(c.country != country);
	});
	
	if(filteredCountries.length < countries.length){
		countries = filteredCountries;
		res.sendStatus(200,"Ok");
	}else{
		res.sendStatus(404,"COUNTRY NOT FOUND")
	}

});
app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");