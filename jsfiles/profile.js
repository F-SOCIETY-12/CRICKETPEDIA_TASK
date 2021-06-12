var endpoint = "https://www.jsonstore.io/8ba4fd855086288421f770482e372ccb5a05d906269a34da5884f39eed0418a1";

let ulval = document.getElementById('ulTasklist')
let inpval = document.getElementById('inpUrl')

var url = inpval.value;
function geturl(){
    
    var protocol_ok = url.startsWith("http://") || url.startsWith("https://") || url.startsWith("ftp://");
    if(!protocol_ok){
        newurl = "http://"+url;
        return newurl;
        }else{
            return url;
        }
        
}

function getrandom() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
 
function genhash(){    //2. 2nd step, hash generation
    if (window.location.hash == ""){  //ye check karta hai hash hai ya nahi
        window.location.hash = getrandom();
    }
    console.log(window.location.hash);
    let li = document.createElement('li')
   
    li.textContent = window.location.hash;
    ulval.appendChild(li)
    $(()=>
    {
        $(()=>{
            $.post('/api/',{
            originalURL : inpval.value,
            hash : url
            },function()
            {
                window.alert("url has been saved")
            })
        })
    })
}


function send_request(url) {
    this.url = url;
    $.ajax({
        'url': endpoint + "/" + window.location.hash.substr(1),
        'type': 'POST',
        'data': JSON.stringify(this.url),
        'dataType': 'json',
        'contentType': 'application/json; charset=utf-8'
})
}

function shorturl(){    ///1. first step ,here we are getting the url
    var longurl = geturl();
    genhash();
  //  send_request(longurl);
}

var hashh = window.location.hash.substr(1)

if (window.location.hash != "") {
    $.getJSON(endpoint + "/" + hashh, function (data) { ///i have to write the db code 
        data = data["result"];                              /// for hash whether its exist or not

        if (data != null) {      //yaha se uss location pe redirect hpraha hai
            window.location.href = data;
        }

    });
}
