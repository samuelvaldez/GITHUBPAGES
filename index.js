
//Require Express for easier serves.
const express = require('express');
const app = express();
const {readFile} = require('fs').promises;
var path = require("path");
var github = require('octonode');
var bodyParser = require('body-parser');
var client = github.client();
var ghsearch = client.search();


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

app.get('/data', function(req, res){
    //console.log('body: ',  req.params.param1);
    console.log(req.query.param2);
    //var client = github.client();

ghsearch.users({ q: req.query.param1 , sort: 'created',order: 'asc',per_page: 10, page: req.query.param2
}, function (err, data,headers) {

    //console.log(data); //json object
    const link = headers.link;
    const links = link.split(",");
    const urls = links.map(a=> {
        return {
            url: a.split(";")[0].replace(">","").replace("<",""),
            title: a.split(";")[1]
        }

    })

    const newData = {
        jsonData: data,
        urlData: urls
    }


    res.send(JSON.stringify(newData));
});
    // ghsearch.get('/users?login='+req.params.param1, {}, function (err, status, body, headers) {
       
      
    //   //res.send( req.params.param1);
    // });

    
    
});





     
app.listen(process.env.PORT || 3000, () => console.log('App is availbe on http://localhost:3000'))