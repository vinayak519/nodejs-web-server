const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
const port = 3000;

// Register partials for header / footer etc components
hbs.registerPartials(__dirname + "/views/partials");

// Define app view engine with html extention
// view engines need VIEWS folder created
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

//custom middleware for maintenance
// app.use( (req, res, next)=>{
//     res.render('maintenance.html');
// });

// Middleware function to server absolute directory
app.use( express.static(__dirname + "/public") );

// Custom Middleware 
app.use( (req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method}: ${req.url} \n`;
    fs.appendFile('server-log.txt', log);

    // console.log(`${now}: ${req.method}: ${req.url}`);
    next();
});

// Register helper mehtod from HBS for specific function
hbs.registerHelper('currentYear', ()=> {
    return new Date().getFullYear()
});

// Custom Helper method works like Pipe
hbs.registerHelper('toUpperCase', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res)=> {
    res.render('index.html', {
        pageTitle: "Home page title goes here"
    });
});

app.get('/about', (req, res)=> {
    // Pass the data with second args key value pare
    res.render('about.html', {
        pageTitle: "About Page title goes here"
    });
});

app.get('/bad', (req, res)=> {
    res.send({
        errorMessage: "UNABLE TO FETCH"
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});