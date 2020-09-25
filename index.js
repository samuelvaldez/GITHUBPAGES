
const express = require('express');
const app = express();
const {readFile} = require('fs').promises;

app.get('/', async (request, response) => {

    readFile('./home.html', 'utf8', (err,html) => {

        if(err) {
            response.status(500).send('SERVICE IS DOWN');
        }

       
    })

    response.send( await readFile('./home.html','utf8'));
});

app.listen(process.env.PORT || 3000, () => console.log('App is availbe on http://localhost:3000'))