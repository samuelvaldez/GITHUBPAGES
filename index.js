
const express = require('express');
const app = express();
const {readFile} = require('fs').promises;
var path = require("path");
var github = require('octonode');
var bodyParser = require('body-parser');

var github = require('octonode');
// Then we instantiate a client with or without a token (as show in a later section)
app.use( express.static('public'));

app.use(bodyParser.json());
//serves up home file 
app.get('/', async (request, response) => {
    readFile('./home.html', 'utf8', (err,html) => {
        if(err) {
            response.status(500).send('SERVICE IS DOWN');
        }
    })
    response.send( await readFile('./home.html','utf8'));
});

app.get('/data/:param1', function(req, res){
    console.log('body: ',  req.params.param1);

    var client = github.client();
    
    client.get('/users/pksunkara', {}, function (err, status, body, headers) {
    //console.log(body);

    
    });
    res.send( req.params.param1);
    
});








     
app.listen(process.env.PORT || 3000, () => console.log('App is availbe on http://localhost:3000'))