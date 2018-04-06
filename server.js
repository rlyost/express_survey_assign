var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');

var app = express();

app.use(session({secret: 'rangersleadtheway'}));  // string for encryption
app.use(bodyParser.urlencoded({extended: true}));

// Now lets set the view engine
app.set('view engine', 'ejs');
// This sets the location where express will look for the ejs views
app.set('views', path.join(__dirname, '/views')); 

app.get("/", function(req, res){
    req.session.destroy();
    res.render('index');
});

app.post('/user', function(req, res){
    var user = req.session;
    user.name = req.body.name;
    user.location = req.body.location;
    user.language = req.body.language;
    user.comment = req.body.comment;
    req.session = user;
    console.log("Post Data \n\n", req.body);
    res.redirect('/result');
});

app.get('/result', function(req, res){
    console.log(req.session);
    var user = req.session;
    res.render('results', { user: user.name, location: user.location, language: user.language, comment: user.comment });
});

app.listen(8002, function(){
    console.log('Running a new express project on port 8002');
});