const express = require("express");
const bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

var port = process.env.PORT || 80;
//base de datos
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
const BASE_API_URL = "/api/v1";
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
app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");