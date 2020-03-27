const express = require("express");
const bodyParser = require("body-parser");
const dataStore = require("nedb");
const path = require("path");

const port = process.env.PORT || 80;
const dbFileName = path.join(__dirname+"/countries_adrescbar.db");
const app = express();

app.use(bodyParser.json());

const db = new dataStore({
				filename: dbFileName,
				autoload: true
	});


var countries_adrescbar = [
    { 
		country: "spain",
		year: 2019,
		ranking: 23,
		index: 75.28,
		var: 1,
	},
	{ 
		country: "germany",
		phone: 2019,
		ranking: 7,
		index: 81.80,
		var: -1.26,	
	},
	{ 
		country: "united_kingdom",
		year: 2019,
		ranking: 9,
		index: 81.2,
		var: -0.96,
	},
	{ 
		country: "italy",
		year: 2019,
		ranking: 30,
		index: 71.53,
		var: 1.07,
	},
	{ 
		country: "croatia",
		year: 2019,
		ranking: 63,
		index: 61.4,
		var: 3.03,
	},
	{ 
		country: "france",
		year: 2019,
		ranking: 15,
		index: 78.71,
		var: 1.02,
	},
	{ 
		country: "portugal",
		year: 2019,
		ranking: 34,
		index: 70.45,
		var: 0.35,
	},
	{ 
		country: "austria",
		year: 2019,
		ranking: 21,
		index: 76.61,
		var: 0.36,
	},
	{ 
		country: "czech_republic",
		year: 2019,
		ranking: 32,
		index: 70.85,
		var: -0.46,
	}
];

var countries_adrescbar1 = [
    { 
		country: "spain",
		year: 2019,
		ranking: 23,
		index: 75.28,
		var: 1,
	},
	{ 
		country: "germany",
		phone: 2019,
		ranking: 7,
		index: 81.80,
		var: -1.26,	
	},
	{ 
		country: "united_kingdom",
		year: 2019,
		ranking: 9,
		index: 81.2,
		var: -0.96,
	},
	{ 
		country: "italy",
		year: 2019,
		ranking: 30,
		index: 71.53,
		var: 1.07,
	},
	{ 
		country: "croatia",
		year: 2019,
		ranking: 63,
		index: 61.4,
		var: 3.03,
	},
	{ 
		country: "france",
		year: 2019,
		ranking: 15,
		index: 78.71,
		var: 1.02,
	},
	{ 
		country: "portugal",
		year: 2019,
		ranking: 34,
		index: 70.45,
		var: 0.35,
	},
	{ 
		country: "austria",
		year: 2019,
		ranking: 21,
		index: 76.61,
		var: 0.36,
	},
	{ 
		country: "czech_republic",
		year: 2019,
		ranking: 32,
		index: 70.85,
		var: -0.46,
	}
];

const BASE_API_URL = "/api/v1";

app.get(BASE_API_URL+"/global_competitiveness_index/loadInitialData1", (req,res) =>{
    db.insert(countries_adrescbar);
	res.sendStatus(200);
	console.log("DATA SEND: " + JSON.stringify(countries_adrescbar));
	});

app.get(BASE_API_URL+"/global_competitiveness_index1", (req,res) =>{
	db.find({}, (err,countries_adrescbar) =>{
		
		
    	res.send(JSON.stringify(countries_adrescbar,null,2));
    	console.log("DATA SEND: " + JSON.stringify(countries_adrescbar));
	});
});


//Lo de arriba es lo nuevo






app.get(BASE_API_URL+"/global_competitiveness_index/loadInitialData", (req,res) =>{
    res.send(JSON.stringify(countries_adrescbar1,null,2));
	});

// GET COUNTRIES

app.get(BASE_API_URL+"/global_competitiveness_index", (req,res) =>{
    res.send(JSON.stringify(countries_adrescbar,null,2));
    console.log("DATA SEND: " + JSON.stringify(countries_adrescbar))
});

// POST COUNTRIES

app.post(BASE_API_URL+"/global_competitiveness_index",(req,res) =>{
    
    var NewCountry = req.body;
    
    if(NewCountry.country == null || NewCountry.country == ""){
        res.sendStatus(400,"BAD REQUEST");
    }else{
		countries_adrescbar.push(NewCountry);
        res.sendStatus(201,"CREATED");
    }
    
});

// POST COUNTRIES/XXX
app.post(BASE_API_URL+"/global_competitiveness_index/:country",(req,res) =>{
        res.sendStatus(405,"METHOD NOT ALLOWED");
});

// DELETE

app.delete(BASE_API_URL+"/global_competitiveness_index", (req,res) =>{
	
    if(countries_adrescbar.length > 0){
        countries_adrescbar = [];
        res.sendStatus(200,"OK");
    }else{
        res.send(405,"METHOD NOT ALLOWED");
    }
});

// GET COUNTRY/XXX
app.get(BASE_API_URL+"/global_competitiveness_index/:country",(req,res)=>{
    
    var  country = req.params.country;
    
    var filteredCountries = countries_adrescbar.filter((c)=>{
        return(c.country == country);
    });
    
    if(filteredCountries.length >= 1){
        res.send(filteredCountries[0]);
    }else{
        res.sendStatus(404,"NOT FOUND")
    }
});
// PUT COUNTRY/XXX

app.put(BASE_API_URL+"/global_competitiveness_index/:country",(req,res)=>{
    var country = req.params.country;
    var UpdatedCountry = req.body;
    var found = false;
   
    var UpdatedCountries = countries_adrescbar.map((c)=>{
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
        countries_adrescbar = UpdatedCountries;
        res.sendStatus(200,"OK");
    }
   
});

app.put(BASE_API_URL+"/global_competitiveness_index",(req,res) =>{
        res.sendStatus(405,"METHOD NOT ALLOWED");
});

// DELETE COUNTRY/XXX
app.delete(BASE_API_URL+"/global_competitiveness_index/:country",(req,res)=>{
    
    var  country = req.params.country;
    
    var filteredCountries = countries_adrescbar.filter((c)=>{
        return(c.country != country);
    });
    
    if(filteredCountries.length < countries_adrescbar.length){
        countries_adrescbar = filteredCountries;
        res.sendStatus(200,"OK");
    }else{
        res.sendStatus(404,"NOT FOUND")
    }
});
app.listen(port, () => {
    console.log("Server ready");
});

console.log("Starting server...");