//var github = require('octonode');
   //  var client = github.client();

//const { user } = require("octonode");

   //  client.get('/users/pksunkara', {}, function (err, status, body, headers) {
   //     // document.getElementById("demo").innerHTML = body;
   //     console.log(body.login);
   //  });\


function getSearch(page) {
 
  var message = $("#inputText").val();
  var errorMessage = "Please Enter some text.";
  if(message){
  var xhr = new XMLHttpRequest();
  var data = message;

  
  xhr.open('GET', '/data?param1=' +data + '&param2=' + page,true);
  xhr.onload = function(data) {
    var data=this.responseText;
    var jsonResponse = JSON.parse(data);
    //console.log(jsonResponse);
    separateData(jsonResponse['jsonData'], jsonResponse['urlData'])
      //console.log(data,"\n");
      //$('#demo2').empty().append(jsonResponse['jsonData']['total_count']);


  };
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(data));
  } else {
  $('#errorMessage').show();
  }
   
}


function separateData(jsonRes, mapUrl) {
  console.log(jsonRes)
  var urlArr = parseUrl(mapUrl);
  parseData(jsonRes['items'], urlArr)
  showTotalCount(jsonRes['total_count'])
}

function parseUrl(mUrl){
  //console.log(mUrl[0]['url'])

 
var reg = /\&page=[0-9]+/;


var pat ;
var final;

  var resArray = [];
  for(var item in mUrl) {
    pat = mUrl[item]['url'].match(reg);
    pat = pat + ""
    final = pat.split('=');

    resArray.push(final[1])
    //console.log(mUrl)
    resArray.push(mUrl[item]['title'])
  }
return resArray   
}



function parseData(jsonRes, urlArr) {
  document.getElementById("divResults").innerHTML = "";
  for(var item in jsonRes){
    
    
    
    //console.log(jsonRes[item])
    createUserName(jsonRes[item]['login'])
    createAvatar(jsonRes[item]['avatar_url'])
  }

  const divButton = document.getElementById("whereButtonsGo");
  divButton.innerHTML = "";
  var i;
for (i = 0; i < urlArr.length; i=i+2) {
      const btn = document.createElement("button")
      //console.log(urlArr[i])
      btn.textContent = urlArr[i+1];
      const num = parseInt(urlArr[i]);
      btn.addEventListener("click", e=> getSearch(num))
      divButton.appendChild(btn);
      
}

 


}


function createUserName(userName) {
    const divExport = document.getElementById("divResults");
    
    var aTag = document.createElement('a');
  aTag.setAttribute('href',"yourlink.htm");
  aTag.innerText = userName;
 
    divExport.appendChild(aTag);



  }
  function createAvatar(imageUrl) {
    const divExport = document.getElementById("divResults");
    var x =  document.createElement("IMG");
    x.setAttribute("src", imageUrl);
    x.setAttribute("width", "304");
    x.setAttribute("height", "228");
    x.setAttribute("alt", "The Pulpit Rock");
    divExport.appendChild(x);
  }

function showTotalCount(totalCount){
  const results = document.getElementById("results");
  var h = document.createElement("H1");
  var t = document.createTextNode("RESULTS: " +totalCount);
  h.appendChild(t);
  results.appendChild(h);
}