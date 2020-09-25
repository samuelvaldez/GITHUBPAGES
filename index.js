
const express = require('express');
const app = express();
const {readFile} = require('fs').promises;
var path = require("path");
var github = require('octonode');

// Then we instantiate a client with or without a token (as show in a later section)
// app.get('/chat.js', function(req, res){
//     res.sendFile('js/scipts.js');
// });
app.use( express.static('public'));

app.get('/', async (request, response) => {
    

    readFile('./home.html', 'utf8', (err,html) => {

        if(err) {
            response.status(500).send('SERVICE IS DOWN');
        }

       
    })

   
   
    response.send( await readFile('./home.html','utf8'));
});
//app.use('/img',express.static(path.join(__dirname, 'public/images')));

//app.use('/css',express.static(path.join(__dirname, 'public/stylesheets')));
app.listen(process.env.PORT || 3000, () => console.log('App is availbe on http://localhost:3000'))