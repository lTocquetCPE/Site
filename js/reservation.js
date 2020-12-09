class Destination {
  constructor(cDest)
  {
    this.name = cDest.name
    this.city=cDest.city
    this.pictureFileName = cDest.pictureFileName
    this.region = cDest.region // eu ou as ou am
    this.displayedPrice = cDest.displayedPrice
    this.perDayPrice = cDest.perDayPrice
    this.description = cDest.description
    this.availability = cDest.availability
    this.adultsMax = cDest.adultsMax
    this.animalsAllowed = cDest.areAnimalsAllowed
    this.breakfastAvailable = cDest.breakfastAvailable
    this.dinnerAvailable = cDest.dinnerAvailable
  }
}

function listDest (pDest){
  lDest=[]
  for (i=0;i<pDest.destinationsList.length;i++){
    lDest.push(new destinationsList(pDest.destinationsList[i]));
  };
  console.log(lDest)
  return lDest
}

//recupération liste des destination

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var myObj = JSON.parse(this.responseText);
    //fonction qui créer la liste des destinations
    var listeDestination=listDest(myObj)
    console.log(listeDestination)
  }
};
xmlhttp.open("GET", "database.txt", true);
xmlhttp.send();
console.log(xmlhttp)
    
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
//request.send();
