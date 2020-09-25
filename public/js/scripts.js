//var github = require('octonode');




function myFunction() {
   //  var client = github.client();

   //  client.get('/users/pksunkara', {}, function (err, status, body, headers) {
   //     // document.getElementById("demo").innerHTML = body;
   //     console.log(body.login);
   //  });\
   var message = $("#inputText").val();
   var xhr = new XMLHttpRequest();
    var data = message;
    
    xhr.open('GET', '/data/' +data);
    xhr.onload = function(data) {
        console.log('loaded', this.responseText);
        $('#demo2').append(this.responseText);
    };
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
  }



  