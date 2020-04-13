module.exports = function (app){
    console.log("Loaded Module");
    const BASE_API_URL = "/api/v1";
    const dataStore = require("nedb");
    const path = require("path");

    const dbFileName = path.join(__dirname,"./global_competitiveness_index.db");

    const db = new dataStore ({
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
    var fichero = db.getAllData();
	if(fichero.length>=1){
		res.sendStatus(409, "ALREADY EXIST");
	}else{
		db.insert(countries_adrescbar);	
		res.send(JSON.stringify(countries_adrescbar,null,2));
	}
});

app.get(BASE_API_URL+"/global_competitiveness_index", (req,res) =>{
		
		var limit = req.query.limit;
		var offset = req.query.offset;
		
		var country = req.query.country;
		var year = parseInt(req.query.year);
		var index = parseFloat(req.query.index);
		var ranking = parseInt(req.query.ranking);
		var var1 = parseFloat(req.query.var);
		var fromYear = parseInt(req.query.fromYear);
		var toYear = parseInt(req.query.toYear);
	
		
		if(country){
			
			db.find({country: country}).skip(offset).limit(limit).exec( function (err, countries_adrescbar) {
				countries_adrescbar.forEach( (c) => {
					delete c._id;
				});
				res.send(JSON.stringify(countries_adrescbar,null,2));
			});
		}else if(year){
			db.find({year: year}).skip(offset).limit(limit).exec( function (err, countries_adrescbar) {
				countries_adrescbar.forEach( (c) => {
					delete c._id;
				});
				res.send(JSON.stringify(countries_adrescbar,null,2));
			});
		}else if(index){
			db.find({index: index}).skip(offset).limit(limit).exec( function (err, countries_adrescbar) {
				countries_adrescbar.forEach( (c) => {
					delete c._id;
				});
				res.send(JSON.stringify(countries_adrescbar,null,2));
			});
		}else if(ranking){
			db.find({ranking: ranking}).skip(offset).limit(limit).exec( function (err, countries_adrescbar) {
				countries_adrescbar.forEach( (c) => {
					delete c._id;
				});
				res.send(JSON.stringify(countries_adrescbar,null,2));
			});
		}else if(var1){
			db.find({var: var1}).skip(offset).limit(limit).exec( function (err, countries_adrescbar) {
				countries_adrescbar.forEach( (c) => {
					delete c._id;
				});
				res.send(JSON.stringify(countries_adrescbar,null,2));
			});
		}else if(fromYear && toYear){
			db.find({year: {$gte: fromYear, $lt: toYear}}).sort({year: 1}).skip(offset).limit(limit).exec( function (err, countries_adrescbar) {
				countries_adrescbar.forEach( (c) => {
					delete c._id;
				});
				res.send(JSON.stringify(countries_adrescbar,null,2));
			});
		}else{
			db.find({}).skip(offset).limit(limit).exec( function (err, countries_adrescbar) {
				countries_adrescbar.forEach( (c) => {
					delete c._id;
				});
				res.send(JSON.stringify(countries_adrescbar,null,2));
			});
		}
	});


// POST COUNTRIES

app.post(BASE_API_URL+"/global_competitiveness_index",(req,res) =>{
    
    var newCountry = req.body;
    var country = req.body.country;
    var year = parseInt(req.body.year);

        db.find({country: country, year: year},(error, countries_adrescbar)=>{
            if(countries_adrescbar.length != 0){    
                res.sendStatus(409,"CONFLICT");
            }else if(!newCountry.country || !newCountry.year || !newCountry.ranking || !newCountry.index 
                      || !newCountry.var || Object.keys(newCountry).length != 5){
                res.sendStatus(400,"BAD REQUEST");
            }else{
                db.insert(newCountry);
                res.sendStatus(201,"CREATED");
            }
        });
    
});

// POST COUNTRIES/XXX
app.post(BASE_API_URL+"/global_competitiveness_index/:country",(req,res) =>{
        res.sendStatus(405,"METHOD NOT ALLOWED");
});

// DELETE

app.delete(BASE_API_URL+"/global_competitiveness_index", (req,res) =>{

    db.find({}, (err,countries_adrescbar) =>{
		if(countries_adrescbar.length != 0){
			db.remove({}, { multi: true }, function (err, numRemoved) { 
   			});
			res.sendStatus(200,"OK");
		}else{
			res.sendStatus(405,"METHOD NOT ALLOWED");
		}
	});
});

// GET COUNTRY/XXX
app.get(BASE_API_URL+"/global_competitiveness_index/:country",(req,res)=>{
    db.find({}, (err,countries_adrescbar) =>{
            var country = req.params.country;
           
            var filteredCountries = countries_adrescbar.filter((c)=>{
                return(c.country == country);
            });
       
            countries_adrescbar.forEach((c) =>{
                delete c._id;
            })
        if(filteredCountries.length >= 1){
            db.find({}, (err,countries_adrescbar) =>{
            res.send(filteredCountries);
            });
        }else{
        res.sendStatus(404,"NOT FOUND");
        }
    });
});
	
// PUT COUNTRY/XXX

app.put(BASE_API_URL+"/global_competitiveness_index/:country",(req,res)=>{
	
	var country = req.params.country;
    var updateC = req.body;
       
        db.find({country : country},(error,countries_adrescbar)=>{
            if(countries_adrescbar.length == 0){
				
                res.sendStatus(404,"NOT FOUND");
				
            }else if(!updateC.country || !updateC.year || !updateC.ranking || !updateC.index
                       || !updateC.var || updateC.country != country || Object.keys(updateC).length != 5){
				
                res.sendStatus(400,"BAD REQUEST");
            }else{
                db.update({ country : country},{$set: updateC});
                res.sendStatus(200,"OK");
            }
        });
});

app.put(BASE_API_URL+"/global_competitiveness_index",(req,res) =>{
        res.sendStatus(405,"METHOD NOT ALLOWED");
});

// DELETE COUNTRY/XXX
app.delete(BASE_API_URL+"/global_competitiveness_index/:country",(req,res)=>{
	var country = req.params.country;
	db.count({country:country}, function(err,count){
		if(count == 0){
			res.sendStatus(404,"NOT FOUND");
		}else{
   			db.find({country: country}, (err,countries_adrescbar) =>{
        		db.remove({country : country}, {}, (err,countries_adrescbar) =>{
        		});
   			 });
			res.sendStatus(200,"OK");
		}
	});
});
	
// GET COUNTRY/YEAR
	
app.get(BASE_API_URL+"/global_competitiveness_index/:country/:year",(req,res)=>{
	var country = req.params.country;
	var year = parseInt(req.params.year);
	
	db.find({country :country, year : year}, (error, countries_adrescbar)=>{
		if(countries_adrescbar.length == 0){
			res.sendStatus(404,"NOT FOUND");
		}else{ 
			res.send(countries_adrescbar.map((c)=>{
			delete c._id;
			return(c);
		}));
	 }}) 
});
		
// PUT COUNTRY/YEAR
	
app.put(BASE_API_URL+"/global_competitiveness_index/:country/:year", (req, res) =>{

	var country = req.params.country;
	var year = parseInt(req.params.year);
	var updateC = req.body;
	
	db.find({"country":country, "year": year},(error,countries_adrescbar)=>{
		if(countries_adrescbar.length == 0){
			res.sendStatus(404,"NOT FOUND");
		}else if ((!updateC.country || !updateC.year || !updateC.ranking || !updateC.index
				 || !updateC.var || updateC.country != country || updateC.year != year)
				 || Object.keys(updateC).length != 5
				){
					res.sendStatus(400,"BAD REQUEST");
		}else{
			db.update({country:country, year:year},{$set: updateC});
			res.sendStatus(200,"OK");
		}
	});
});
	
// DELETE COUNTRY/YEAR
	
app.delete(BASE_API_URL+"/global_competitiveness_index/:country/:year", (req,res)=>{

    var country = req.params.country;
    var year = parseInt(req.params.year);

    db.find({country : country, year : year},(error, countries_adrescbar)=>{
        if(countries_adrescbar.length == 0){
            res.sendStatus(404,"NOT FOUND");
        }else{
            res.sendStatus(200,"OK");
            db.remove({country : country, year : year});
        }
    })
});	
}