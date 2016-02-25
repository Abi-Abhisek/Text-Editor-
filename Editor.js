var express = require("express");
var parser= require("body-parser");
var path= require("path");

var fs= require("fs");
var app= express();

app.use(express.static(__dirname + '/views'));
app.set('views',__dirname+'/views');
app.set('view engine','ejs');
app.use(parser.urlencoded({ extended: false }));


/* Shows the directory list */
app.get('/',function(req,res){
	fs.readdir(path.join(process.cwd(),"/store/"),function(err,files){
		var files_not_folders = [] ;
		files.forEach(function(ele,indx,arr){
			if(fs.lstatSync(path.join(process.cwd(),"/store/",ele)).isFile()){
				files_not_folders.push(ele);
			}
		})
		res.render("dir.ejs",{files:files_not_folders});
	});
});

/* Editor Main */
app.get("/editor",function(req,res){
	var filename = req.query.filename ,
		type = req.query.type ,
		initialValue = "" ;

		if ((type == "edit")||(type == "read")||(type == "append")) {
			initialValue = fs.readFileSync(path.join(process.cwd(),"/store/",filename));
		};

	res.render("editor",{
		filename:filename ,
		type : type ,
		initialValue : initialValue 
	})
})

/* Appending The fle */
app.post('/append',function(req,res){
	var filename = req.body.filename ,
		text = req.body.text ;
	fs.appendFile(path.join(process.cwd(),"/store/",filename),text,'utf-8',function (err) 
	{
  		if (err) {return console.log(err);}
  		else {console.log("appended");
  		res.redirect("/");}
	})

});

/* Readng the file */
app.post('/read',function(req,res){
	var filename = req.body.filename ;
	fs.readFile(path.join(process.cwd(),"/store/",filename),'utf-8',function (err,data) 
	{
  		if (err) {return console.log(err);}
  		else{
			res.render(data) ;
		}
	})
	res.redirect("/");
});
	

/*SAVE DOC */ 
app.post("/save",function(req,res){
	var filename = req.body.filename ,
		text = req.body.text ;
	fs.writeFile(path.join(process.cwd(),"/store/",filename),text,function(err){
		if(err){console.log(err);res.send(err);}
		else{
			res.render("success") ;
		}
	})
});

app.listen(1234, function(){
	console.log("listening on 1234") ;
});