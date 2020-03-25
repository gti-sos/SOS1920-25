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
	},
	{
		country: "france",
		year:     2019,
		happinesRanking: 17,
		happinessRate: 6.592,
		var: 1.59
	},
	{
		country: "portugal",
		year:     2019,
		happinesRanking: 66,
		happinessRate: 5.693,
		var: 5.23
	}
	
];

var countries2 = [
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
	},
	{
		country: "france",
		year:     2019,
		happinesRanking: 17,
		happinessRate: 6.592,
		var: 1.59
	},
	{
		country: "portugal",
		year:     2019,
		happinesRanking: 66,
		happinessRate: 5.693,
		var: 5.23
	}
	
];


const BASE_API_URL = "/api/v1";

// GET COUNTRIES

app.get(BASE_API_URL+"/happiness_rate/loadInitialData", (req,res) =>{
	res.send(JSON.stringify(countries2,null,2));
});

app.get(BASE_API_URL+"/happiness_rate", (req,res) =>{
    res.send(JSON.stringify(countries,null,2));
    console.log("DATA SEND: " + JSON.stringify(countries))
});

// POST COUNTRIES

app.post(BASE_API_URL+"/happiness_rate",(req,res) =>{
	
	var NewCountry = req.body;
	
	if(NewCountry.country == null || NewCountry.country == ""){
		res.sendStatus(400,"BAD REQUEST")
	}else{
		countries.push(NewCountry);
		res.sendStatus(201,"CREATED");
	}
	
});

// DELETE COUNTRIES
app.delete(BASE_API_URL+"/happiness_rate", (req,res) =>{
	 
	var emptyContries =[];
	
	if(countries.length > 0){
		countries = emptyContries;
		res.sendStatus(200,"OK");
	}else{
		res.sendStatus(405,"METHOD NOT ALLOWED");
	}	
});
//PUT COUNTRIES
app.put(BASE_API_URL+"/happiness_rate", (req,res)=>{
	res.sendStatus(405,"METHOD NOT ALLOWED");
});

//POST COUNTRIES/XXX
app.post(BASE_API_URL+"/happiness_rate/:country",(req,res) =>{
	res.sendStatus(405,"METHOD NOT ALLOWED");
});
// GET COUNTRIES/XXX
app.get(BASE_API_URL+"/happiness_rate/:country",(req,res)=>{
	
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
app.put(BASE_API_URL+"/happiness_rate/:country",(req,res)=>{
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
app.delete(BASE_API_URL+"/happiness_rate/:country",(req,res)=>{
	
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

//base de datos ale
var countries_for_equality_stats = [
	{ 
		country: "spain" ,
		year:2019,
		global_peace_index: 1699, 
		global_peace_ranking: 32,
		var: 2
		
	},
	{ 
		country: "germany" ,
		year:2019,
		global_peace_index: 1547,
		global_peace_ranking: 22,
		var: 5
	},
	{ 
		country: "united_kingdom" ,
		year: 2019,
		global_peace_index: 1801,
		global_peace_ranking: 45,
		var: -12
	},{ 
		country: "france" ,
		year: 2019,
		global_peace_index: 1892,
		global_peace_ranking: 60,
		var: -1
	},{ 
		country: "italy" ,
		year: 2019,
		global_peace_index: 1754,
		global_peace_ranking: 39,
		var: -1
	}
];

var countries_for_equality_stats1 = [
	{ 
		country: "spain" ,
		year:2019,
		global_peace_index: 1699, 
		global_peace_ranking: 32,
		var: 2
		
	},
	{ 
		country: "germany" ,
		year:2019,
		global_peace_index: 1547,
		global_peace_ranking: 22,
		var: 5
	},
	{ 
		country: "united_kingdom" ,
		year: 2019,
		global_peace_index: 1801,
		global_peace_ranking: 45,
		var: -12
	},{ 
		country: "france" ,
		year: 2019,
		global_peace_index: 1892,
		global_peace_ranking: 60,
		var: -1
	},{ 
		country: "italy" ,
		year: 2019,
		global_peace_index: 1754,
		global_peace_ranking: 39,
		var: -1
	}
];
//get de la base de datos
app.get(BASE_API_URL+"/countries_for_equality_stats", (req,res) =>{
	res.send(JSON.stringify(countries_for_equality_stats,null,2));
});
//get load
app.get(BASE_API_URL+"/countries_for_equality_stats/loadInitialData", (req,res) =>{
	res.send(JSON.stringify(countries_for_equality_stats1,null,2));
});
//meter un nuevo dato en la base de datos
app.post(BASE_API_URL+"/countries_for_equality_stats",(req,res) =>{
	
	var newcountries_for_equality_stats = req.body;
	
	if((newcountries_for_equality_stats == "") || (newcountries_for_equality_stats.country == null)){
		res.sendStatus(400,"BAD REQUEST");
	} else {
		countries_for_equality_stats.push(newcountries_for_equality_stats); 	
		res.sendStatus(201,"CREATED");
	}
});
//conseguir la tabla por nombre
app.get(BASE_API_URL+"/countries_for_equality_stats/:country", (req,res)=>{
	
	var country = req.params.country;
	
	var filteredCountry = countries_for_equality_stats.filter((c) => {
		return (c.country == country);
	});
	
	
	if(filteredCountry.length >= 1){
		res.send(filteredCountry[0]);
		res.sendStatus(200,"OK");
	}else{
		res.sendStatus(404,"COUNTRY NOT FOUND NOOB");
	}
});
//eliminar un dato de la base por filtro de 
app.delete(BASE_API_URL+"/countries_for_equality_stats/:country", (req,res)=>{
	
	var country = req.params.country;
	
	var filteredCountry = countries_for_equality_stats.filter((c) => {
		return (c.country != country);
	});
	
	
	if(filteredCountry.length < countries_for_equality_stats.length){
		countries_for_equality_stats = filteredCountry;
		res.sendStatus(200,"OK");
	}else{
		res.sendStatus(404,"COUNTRY NOT FOUND");
	}
	
});
//actualizar un recurso
app.put(BASE_API_URL+"/countries_for_equality_stats/:country",(req,res)=>{
    var  country = req.params.country;
    var UpdatedCountry = req.body;
    var found = false;
    var UpdatedCountries = countries_for_equality_stats.map((c)=>{
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
        countries_for_equality_stats = UpdatedCountries;
        res.sendStatus(200,"OK");
    }

});

//fallo POST a un recurso
app.post(BASE_API_URL+"/countries_for_equality_stats/:country",(req,res) =>{
		res.sendStatus(405,"METHOD NOT ALLOWED");
	
});
//fallo PUT base
app.put(BASE_API_URL+"/countries_for_equality_stats",(req,res) =>{
		res.sendStatus(405,"METHOD NOT ALLOWED");
	
});
//eliminar todo
app.delete(BASE_API_URL+"/countries_for_equality_stats", (req,res) =>{

    var emptyContries =[];

    if(countries_for_equality_stats.length > 0){
        countries_for_equality_stats = emptyContries;
        res.sendStatus(200,"OK");
    }else{
        res.sendStatus(405,"METHOD NOT ALLOWED");
    }
});
app.post(BASE_API_URL+"/countries_for_equality_stats/rei", (req,res) =>{

    var basicContries =[{ 
		country: "spain" ,
		year:2019,
		global_peace_index: 1699, 
		global_peace_ranking: 32,
		var: 2
		
	},
	{ 
		country: "germany" ,
		year:2019,
		global_peace_index: 1547,
		global_peace_ranking: 22,
		var: 5
	},
	{ 
		country: "united_kingdom" ,
		year: 2019,
		global_peace_index: 1801,
		global_peace_ranking: 45,
		var: -12
	},{ 
		country: "france" ,
		year: 2019,
		global_peace_index: 1892,
		global_peace_ranking: 60,
		var: -1
	},{ 
		country: "italy" ,
		year: 2019,
		global_peace_index: 1754,
		global_peace_ranking: 39,
		var: -1
	}];

    if(countries_for_equality_stats.length == 0){
        countries_for_equality_stats = basicContries;
        res.sendStatus(200,"OK");
    }else{
        res.sendStatus(405,"METHOD NOT ALLOWED");
    }
});

//adri
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
year: 2019,
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

var countries_adrescbar2 = [
    { 
country: "spain",
year: 2019,
ranking: 23,
index: 75.28,
var: 1,
},
{ 
country: "germany",
year: 2019,
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
app.get(BASE_API_URL+"/global_competitiveness_index/loadInitialData", (req,res) =>{
    res.send(JSON.stringify(countries_adrescbar2,null,2));
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