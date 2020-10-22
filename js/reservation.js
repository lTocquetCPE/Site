


var request = new XMLHttpRequest();
request.open("GET", "../database/database.json", true);
request.onreadystatechange = ()=> {
  if(request.readyState == 4 && request.status ==200){
    var siteData = JSON.parse(request.responseText);

    
    // use forEach pour la boucle for
    //recupération de la ville (pour température)
    var city="tokyo"
    var cityTempURL="http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=c64e356abc8cd3398484c5fdf9253f87"

    // recupération de la température
    fetch(cityTempURL)
    .then (function(reponse){
        if (reponse.ok){
            reponse.json().then(re=>{
            console.log(re.main.temp)
            })
        }else{
            console.log("Mauvaise réponse du serveur")
        }
    })
    .catch(function (error) {
        console.log(error);
    });  

  }
}
request.send();