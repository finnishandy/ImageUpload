/*Define dependencies.*/

var express=require("express");
var multer  = require('multer');
var expressHbs = require('express3-handlebars');
var app=express();
var done=false;
var dimensions = [];

app.engine('hbs', expressHbs({extname:'hbs', defaultLayout:'main.hbs'}));
app.set('view engine', 'hbs');



/*Configure the multer.*/

app.use(multer({ dest: './uploads/',
    rename: function (fieldname, filename) {
        //return filename+Date.now();
        //return filename;
        return "bg";
    },
    onFileUploadStart: function (file) {
        console.log(file.originalname + ' is starting ...')
    },
    onFileUploadComplete: function (file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path)
        done=true;
    }
}));



/*Handling routes.*/
app.get('/', function(req, res){
    res.render('index', {dimensions: dimensions});
});
/*
app.get('/',function(req,res){
    app.locals = dimensions;
    res.sendfile("./html/index.html");
});
*/

app.get('/js/:id',function(req,res){
    res.sendfile("./js/" + req.params.id);
});

app.get('/api/images/:id',function(req,res){
    res.sendfile("./uploads/" + req.params.id);
});

app.get('/api/dimensions',function(req,res){
    res.json(dimensions);
});

app.post('/api/photo',function(req,res){
    dimensions = JSON.parse(req.body.dimensions);
    if(done==true){
        console.log(req.files);
        res.end("File uploaded.");
    }
});

/*Run the server.*/
app.listen(3000,function(){
    console.log("Working on port 3000");
});