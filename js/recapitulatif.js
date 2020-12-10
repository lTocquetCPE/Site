//Finds the current destination from the database
let getCurrentDestination = (siteData, destinationName) =>{
  return currentDest = siteData.destinationsList.find((dest) =>(
    dest.name == destinationName
  ))
}

let getDestinationTemperature = (siteData, currentDestination) =>{
  return new Promise((resolve, reject) => {

    let city= currentDestination.city
    let cityTempURL="http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=c64e356abc8cd3398484c5fdf9253f87"
    let destinationTemperature = 20
    // recupération de la température
    fetch(cityTempURL)
    .then (function(reponse){
        if (reponse.ok){
            reponse.json().then(re=>{
            resolve(re.main.temp - 273,15)
            }).catch(console.error)
        }else{
            console.log("Mauvaise réponse du serveur")
        }
    })
    .catch(console.error);  

  })
}


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const destinationName = urlParams.get('destinationName')
const nom = urlParams.get('nom')
const prenom = urlParams.get('prenom')
const adultsNb = urlParams.get('adultsNb')
const childrenNb = urlParams.get('childrenNb')
console.log(destinationName)



//recupération liste des destination

var request = new XMLHttpRequest();
request.open("GET", "../database/database.json", true);
request.onreadystatechange = ()=> {
  if(request.readyState == 4 && request.status == 200){
    var siteData = JSON.parse(request.responseText);

    let currentDestination = getCurrentDestination(siteData, destinationName)
    let currentTemperature = -273.15
    console.log(currentDestination)
    //EVENTS



    //API 
    getDestinationTemperature(siteData, currentDestination).then((temp)=>{
      currentTemperature = temp
      console.log(currentTemperature)
      document.getElementById("infoTemperature").innerHTML = temp.toFixed(1) + '°C'
    }
    ).catch(console.error)

    //Reservation data fillling document
    document.getElementById("destinationTitle").innerHTML = "Destination : " + currentDestination.name
    document.getElementById("clientFamilyName").innerHTML = "Nom : "+ nom
    document.getElementById("clientName").innerHTML = "Prénom : " + prenom
    document.getElementById("adultsNb").innerHTML = "Adulte(s) : " + adultsNb
    document.getElementById("childrenNb").innerHTML = "Adulte(s) : " + childrenNb
    document.getElementById("phoneNumber").innerHTML = "Numéro de téléphone : " + ((urlParams.get('Téléphone') == "")? "Non renseigné" : urlParams.get('Téléphone') )
    document.getElementById("departureDate").innerHTML = "Date de départ : " + (urlParams.get('departureDate'))
    document.getElementById("endDate").innerHTML = "Date de fin : " + (urlParams.get('endDate'))
    document.getElementById("breakfast").innerHTML = "Petit déjeuner : " + ((urlParams.get('breakfast')) ? "Oui" : "Non")
    document.getElementById("dinner").innerHTML = "Diner : " + ((urlParams.get('dinner')) ? "Oui" : "Non")
    document.getElementById("animals").innerHTML = "Animaux : " + urlParams.get('animalsNb')
    document.getElementById("price").innerHTML = "Prix : " + urlParams.get('price') + "€"
    document.getElementById("reservationNumber").innerHTML = "Numéro de réservation : " + (Math.random()*100000000).toFixed(0  )
    document.getElementById("remarques").innerHTML = "Remarques : " + (urlParams.get('Remarques') == ""? "Aucune" : urlParams.get('Remarques') )
    document.getElementById("travelPic").src = "../ressources/" + currentDestination.pictureFileName

  }
}
request.send();

    
  