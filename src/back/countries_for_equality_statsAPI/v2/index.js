module.exports = function (app){
	console.log("Loaded Module");
	const BASE_API_URL = "/api/v2";
	const dataStore = require("nedb");
	const path = require("path");
	
	const dbFileName = path.join(__dirname,"./countries_for_equality_stat.db");

	const db = new dataStore ({
		filename: dbFileName,
		autoload: true
	});
	
	var countries_for_equality_stats = [
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

//get load 
app.get(BASE_API_URL+"/countries_for_equality_stats/LoadInitialData", (req,res) =>{
	var fichero = db.getAllData();
	if(fichero.length>=1){
		res.sendStatus(409, "ALREADY EXIST(la base se encuentra llena o con elementos)");
		console.log("There is already loaded data");
	}else{
		db.insert(countries_for_equality_stats1);	
		res.sendStatus(200);
		console.log("Initial Countries for Equality Stats"+JSON.stringify(countries_for_equality_stats1,null,2))
}
});


//get de la base de datos
app.get(BASE_API_URL+"/countries_for_equality_stats", (req,res) =>{
		
		var limit = req.query.limit;
		var offset = req.query.offset;
		console.log("limit="+limit+", offset="+offset);
		
		var country = req.query.country;
		var year = parseInt(req.query.year);
		var global_peace_index = parseInt(req.query.global_peace_index);
		var global_peace_ranking = parseInt(req.query.global_peace_ranking);
		var var1 = parseInt(req.query.var);
		
		var fromYear = parseInt(req.query.fromYear);
		var toYear = parseInt(req.query.toYear);
		console.log("country="+country+", year="+year+", global_peace_index="+global_peace_index+", bus="+global_peace_ranking+", var="+var1+", fromYear="+fromYear+", toYear="+toYear);
		
		if(country){
			
			db.find({country: country}).skip(offset).limit(limit).exec( function (err, countries_for_equality_stats1) {
				countries_for_equality_stats1.forEach( (v) => {
					delete v._id;
				});
				res.send(JSON.stringify(countries_for_equality_stats1,null,2));
				console.log("Data sent:"+JSON.stringify(countries_for_equality_stats1,null,2));
			});
		}else if(year){
			db.find({year: year}).skip(offset).limit(limit).exec( function (err, countries_for_equality_stats1) {
				countries_for_equality_stats1.forEach( (v) => {
					delete v._id;
				});
				res.send(JSON.stringify(countries_for_equality_stats1,null,2));
				console.log("Data sent:"+JSON.stringify(countries_for_equality_stats1,null,2));
			});
		}else if(global_peace_index){
			db.find({global_peace_index: global_peace_index}).skip(offset).limit(limit).exec( function (err, countries_for_equality_stats1) {
				countries_for_equality_stats1.forEach( (v) => {
					delete v._id;
				});
				res.send(JSON.stringify(countries_for_equality_stats1,null,2));
				console.log("Data sent:"+JSON.stringify(countries_for_equality_stats1,null,2));
			});
		}else if(global_peace_ranking){
			db.find({global_peace_ranking: global_peace_ranking}).skip(offset).limit(limit).exec( function (err, countries_for_equality_stats1) {
				countries_for_equality_stats1.forEach( (v) => {
					delete v._id;
				});
				res.send(JSON.stringify(countries_for_equality_stats1,null,2));
				console.log("Data sent:"+JSON.stringify(countries_for_equality_stats1,null,2));
			});
		}else if(var1){
			db.find({var: var1}).skip(offset).limit(limit).exec( function (err, countries_for_equality_stats1) {
				countries_for_equality_stats1.forEach( (v) => {
					delete v._id;
				});
				res.send(JSON.stringify(countries_for_equality_stats1,null,2));
				console.log("Data sent:"+JSON.stringify(countries_for_equality_stats1,null,2));
			});
		}else if(fromYear && toYear){
			db.find({year: {$gte: fromYear, $lt: toYear}}).sort({year: 1}).skip(offset).limit(limit).exec( function (err, countries_for_equality_stats1) {
				countries_for_equality_stats1.forEach( (v) => {
					delete v._id;
				});
				res.send(JSON.stringify(countries_for_equality_stats1,null,2));
				console.log("Data sent:"+JSON.stringify(countries_for_equality_stats1,null,2));
			});
		}else{
			db.find({}).skip(offset).limit(limit).exec( function (err, countries_for_equality_stats1) {
				countries_for_equality_stats1.forEach( (v) => {
					delete v._id;
				});
				res.send(JSON.stringify(countries_for_equality_stats1,null,2));
				console.log("Data sent:"+JSON.stringify(countries_for_equality_stats1,null,2));
			});
		}
	});
	
//meter un nuevo dato en la base de datos
app.post(BASE_API_URL+"/countries_for_equality_stats",(req,res) =>{

		var newcountries_for_equality_stats = req.body;
		var country = req.body.country;
		var year = parseInt(req.body.year);

		db.find({"country": country, "year": year},(error, countries_for_equality_stats1)=>{
			if(countries_for_equality_stats1.length != 0){	
				console.log("409.ALREADY EXIST");
				res.sendStatus(409);
			}else if(!newcountries_for_equality_stats.country || !newcountries_for_equality_stats.year || 	!newcountries_for_equality_stats.global_peace_index || !newcountries_for_equality_stats.global_peace_ranking
		  				 || !newcountries_for_equality_stats.var){
				console.log("Los campos no estan bien escritos");
				res.sendStatus(400);
			}else{
				console.log("Los datos que se desean insertar son correctos");
				db.insert(newcountries_for_equality_stats);
				res.sendStatus(201);
			}
		});
	});		

//eliminar un dato de la base por filtro de 
app.delete(BASE_API_URL+"/countries_for_equality_stats/:country", (req,res)=>{
	var country = req.params.country;
	db.count({country:country},function(err,count){
	if(count==0){
		res.sendStatus(404,"NOT FOUND");
	}else{
		db.find({country: country}, (err,countries_for_equality_stats1) =>{
			db.remove({country : country}, {}, (err,countries_for_equality_stats1) =>{}); 		
	});
		res.sendStatus(200,"OK");
	}
});
	
});
//actualizar un recurso
app.put(BASE_API_URL+"/countries_for_equality_stats/:country", (req, res) =>{

		var country = req.params.country;
		var updateC = req.body;
		
		db.find({"country":country},(error,countries_for_equality_stats1)=>{
			console.log(countries_for_equality_stats1);
			if(countries_for_equality_stats1.length == 0){
				console.log("Error 404, recurso no encontrado.");
				res.sendStatus(404);
			}else if(!updateC.country || !updateC.year || !updateC.global_peace_index || !updateC.global_peace_ranking
		  			 || !updateC.var || updateC.country != country 
					 || Object.keys(updateC).length != 5
					){
				
					console.log("PUT recurso encontrado.Campos no validos 400");
					res.sendStatus(400);
			}else{
				db.update({"country":country},{$set: updateC});
				console.log("PUT realizado");
				res.sendStatus(200);
			}
		});
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
	db.find({}, (err,countries_for_equality_stats1) =>{
    	if(countries_for_equality_stats1.length != 0){
        	db.remove({},{multi:true},(err,countries_for_equality_stats1)=>{		
		});
        	res.sendStatus(200,"OK");
    	}else{
        	res.sendStatus(405,"METHOD NOT ALLOWED");
    }
	});
});
//pillar dato country year
	app.get(BASE_API_URL+"/countries_for_equality_stats/:country/:year", (req,res)=>{

        var country = req.params.country;
        var year = parseInt(req.params.year);

        db.find({"country" :country, "year":year},(error, countries_for_equality_stats1)=>{
            if(countries_for_equality_stats1.length==0){
                console.log("404. Not Found");
                res.sendStatus(404);
            }else{
                res.send(countries_for_equality_stats1.map((t)=>{
                    delete t._id;
                    return(t);
                })[0]);
                console.log("VALIDO COUNTRY ANYO");
            }
        })
    });	

//actualiza un recurso country año
app.put(BASE_API_URL+"/countries_for_equality_stats/:country/:year", (req, res) =>{

		var country = req.params.country;
		var year = parseInt(req.params.year);
		var updateC = req.body;
		
		db.find({"country":country, "year": year},(error,countries_for_equality)=>{
			console.log(countries_for_equality);
			if(countries_for_equality.length == 0){
				console.log("Error 404, recurso no encontrado.");
				res.sendStatus(404);
			}else if(!updateC.country || !updateC.year || !updateC.global_peace_index || !updateC.global_peace_ranking
		  			 || !updateC.var || updateC.country != country || updateC.year != year
					 || Object.keys(updateC).length != 5
					){
				
					console.log("PUT recurso encontrado.Campos no validos 400");
					res.sendStatus(400);
			}else{
				db.update({"country":country,"year":year},{$set: updateC});
				console.log("PUT realizado");
				res.sendStatus(200);
			}
		});
	});	
	
//delete dato country año
app.delete(BASE_API_URL+"/countries_for_equality_stats/:country/:year", (req,res)=>{

    var country = req.params.country;
    var year = parseInt(req.params.year);

    db.find({"country":country, "year":year},(error, countries_for_equality_stats1)=>{
        if(countries_for_equality_stats1.length==0){
            res.sendStatus(404,"NOT FOUND");
        }else{
            res.sendStatus(200,"OK");
            db.remove({ "country":country, "year":year });
            }
        })
    });	
};