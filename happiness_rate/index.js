module.exports = function (app){
    console.log("Loaded Module");
    const BASE_API_URL = "/api/v1";
    const dataStore = require("nedb");
    const path = require("path");

    const dbFileName = path.join(__dirname,"./countries.db");

    const db = new dataStore ({
        filename: dbFileName,
        autoload: true
    });
   

var initialcountries = [
	{ 
		country: "spain",
		year:     2019,
		happinessRanking: 30,
		happinessRate: 6.365,
		var: 0.7
	},
	{ 
		country: "germany",
		year:     2019,
		happinessRanking: 17,
		happinessRate: 6.985,
		var: 0.29	
	},
	{
		country: "france",
		year:     2019,
		happinessRanking: 17,
		happinessRate: 6.592,
		var: 1.59
	},
	{
		country: "portugal",
		year:     2019,
		happinessRanking: 66,
		happinessRate: 5.693,
		var: 5.23
	}
	
];

// GET COUNTRIES

app.get(BASE_API_URL+"/happiness_rate/loadInitialData", (req,res) =>{
	db.insert(initialcountries);
	res.send(JSON.stringify(initialcountries,null,2));
});

app.get(BASE_API_URL+"/happiness_rate", (req,res) =>{
	var query = {};
    let offset = 0;
	let limit = Number.MAX_SAFE_INTEGER;
	
    if (req.query.offset) {
    	offset = parseInt(req.query.offset);
        delete req.query.offset;
        }
    if (req.query.limit) {
        limit = parseInt(req.query.limit);
        delete req.query.limit;
        }
	
	console.log("New GET .../countries");
	db.find({}).sort({country:1,year:-1}).skip(offset).limit(limit).exec((error,countries) =>{
		
			countries.forEach((c) =>{
				delete c._id;
			})
			res.send(JSON.stringify(countries,null,2));
    		console.log("Countries: " + JSON.stringify(countries));
			});
    
});

// POST COUNTRIES

app.post(BASE_API_URL+"/happiness_rate",(req,res) =>{
	
	var newCountry = req.body;
	var country = req.body.country;
	var year = parseInt(req.body.year);

		db.find({"country": country, "year": year},(error, countries)=>{
			if(countries.length != 0){	
				res.sendStatus(409,"CONFLICT");
			}else if(!newCountry.country || !newCountry.year || !newCountry.happinessRanking || !newCountry.happinessRate 
					  || !newCountry.var || Object.keys(newCountry).length != 5){
				res.sendStatus(400,"BAD REQUEST");
			}else{
				db.insert(newCountry);
				res.sendStatus(201,"CREATED");
			}
		});
	
});

// DELETE COUNTRIES

app.delete(BASE_API_URL+"/happiness_rate", (req,res) =>{
	 db.find({}, (err,countries) =>{
        if(countries.length != 0){
            db.remove({}, { multi: true }, function (err, numRemoved) {
               });
            res.sendStatus(200,"OK");
        }else{
            res.sendStatus(405,"METHOD NOT ALLOWED");
        }
    });
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
	db.find({}, (err,countries) =>{
			var country = req.params.country;
			
			var filteredCountries = countries.filter((c)=>{
				return(c.country == country);
			});
		
			countries.forEach((c) =>{
				delete c._id;
			})
		if(filteredCountries.length >= 1){
			db.find({}, (err,countries) =>{
			res.send(filteredCountries);
			});
		
		}else{
		res.sendStatus(404,"NOT FOUND")
		}
			});
});
	
//GET COUNTRIES/XXX/YYY
	
app.get(BASE_API_URL+"/happiness_rate/:country/:year", (req,res)=>{

        var country = req.params.country;
        var year = parseInt(req.params.year);

        db.find({"country" :country, "year":year},(error, countries)=>{
            if(countries.length==0){
                
                res.sendStatus(404,"NOT FOUND");
            }else{
                res.send(countries.map((c)=>{
                    delete c._id;
                    return(c);
                }));
                console.log("OK");
            }
        })
    });
// PUT COUNTRY/XXX/YYY
	app.put(BASE_API_URL+"/happiness_rate/:country/:year", (req, res) =>{

        var country = req.params.country;
		var year = parseInt(req.params.year);
		var updateC = req.body;
		
		db.find({"country":country, "year": year},(error,countries)=>{
			console.log(countries);
			if(countries.length == 0){
				console.log("Error 404, recurso no encontrado.");
				res.sendStatus(404);
			}else if(!updateC.country || !updateC.year || !updateC.happinessRanking || !updateC.happinessRate
		  			 || !updateC.var || updateC.country != country || updateC.year != year
					 || Object.keys(updateC).length != 5
					){
				
					res.sendStatus(400,"BAD REQUEST");
			}else{
				db.update({"country":country,"year":year},{$set: updateC});
				res.sendStatus(200,"OK");
			}
		});
	});
// PUT COUNTRY/XXX

app.put(BASE_API_URL+"/happiness_rate/:country",(req,res)=>{
 	var country = req.params.country;
	var updateC = req.body;
		
		db.find({"country":country},(error,countries)=>{
			console.log(countries);
			if(countries.length == 0){
				console.log("Error 404, recurso no encontrado.");
				res.sendStatus(404);
			}else if(!updateC.country || !updateC.year || !updateC.happinessRanking || !updateC.happinessRate
		  			 || !updateC.var || updateC.country != country || Object.keys(updateC).length != 5){
					res.sendStatus(400,"BAD REQUEST");
			}else{
				db.update({"country":country},{$set: updateC});
				res.sendStatus(200,"OK");
			}
		});
	});

// DELETE COUNTRY/XXX

app.delete(BASE_API_URL+"/happiness_rate/:country",(req,res)=>{
   var country = req.params.country;
   db.count({country:country},function(err,count){
    if(count==0){
        res.sendStatus(404,"NOT FOUND");
    }else{

        db.find({country: country}, (err,countries) =>{
        db.remove({country : country}, {}, (err,countries_for_equality_stats1) =>{}); 

    });
        res.sendStatus(200,"OK");
    }
   });
});
	
//DELETE COUNTRY/XXX/YYY
	
app.delete(BASE_API_URL+"/happiness_rate/:country/:year", (req,res)=>{

	var country = req.params.country;
	var year = parseInt(req.params.year);

	db.find({"country":country, "year":year},(error, countries)=>{
		if(countries.length==0){
			res.sendStatus(404,"NOT FOUND");
		}else{	
            res.sendStatus(200,"OK");
            db.remove({ "country":country, "year":year });
			}
		})
	});
}