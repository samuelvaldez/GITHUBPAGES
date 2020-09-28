//sends values to Server for it can make the api call, then recieve json data.
//@param page contains the first page number this is passed to the api in which it gives me the first page
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
      separateData(jsonResponse['jsonData'], jsonResponse['urlData'])
    };
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
  } else {
    $('#errorMessage').show();
  }
   
}

//separate data for i can use it easier
//@param jsonRes is the whole api json call
//@mapUrl contains meta data, url for last page and front page
function separateData(jsonRes, mapUrl) {
  var urlArr = parseUrl(mapUrl);
  parseData(jsonRes['items'], urlArr)
  showTotalCount(jsonRes['total_count'])
}

//Extract the page numbers from the url for I can use them later to navigate and paginate other pages.
//@meta data url
function parseUrl(mUrl){
  var reg = /\&page=[0-9]+/;
  var pat ;
  var final;
  var resArray = [];
  for(var item in mUrl) {
    pat = mUrl[item]['url'].match(reg);
    pat = pat + ""
    final = pat.split('=');

    resArray.push(final[1])
    resArray.push(mUrl[item]['title'])
  }
  return resArray   
}


//Here we create our images,username and buttons for pagination
//@jsonRes is the whole json 
//@urlArr contains numbers and names for pagination
function parseData(jsonRes, urlArr) {
  document.getElementById("divResults").innerHTML = "";
  for(var item in jsonRes){
    createUserName(jsonRes[item])
    createAvatar(jsonRes[item]['avatar_url'])
  }
  const divButton = document.getElementById("whereButtonsGo");
  divButton.innerHTML = "";
  var i;
  for (i = 0; i < urlArr.length; i=i+2) {
      const btn = document.createElement("button")
      btn.textContent = urlArr[i+1];
      const num = parseInt(urlArr[i]);
      btn.addEventListener("click", e=> getSearch(num))
      divButton.appendChild(btn); 
  }

}

//create a username
function createUserName(userName) {
  const divExport = document.getElementById("divResults");
  var aTag = document.createElement('a');
  aTag.setAttribute('href',userName['html_url']);
  aTag.innerText = userName['login'];
  divExport.appendChild(aTag);
  }
//create image using the image url
function createAvatar(imageUrl) {
  const divExport = document.getElementById("divResults");
  var x =  document.createElement("IMG");
  x.setAttribute("src", imageUrl);
  x.setAttribute("width", "304");
  x.setAttribute("height", "228");
  x.setAttribute("alt", "The Pulpit Rock");
  divExport.appendChild(x);
}
//get the total count of results
function showTotalCount(totalCount){
  const results = document.getElementById("results");
  results.innerHTML = "";
  var h = document.createElement("H1");
  var t = document.createTextNode("RESULTS: " +totalCount);
  h.appendChild(t);
  results.appendChild(h);
}