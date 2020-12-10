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

//Finds the current destination from the database
let getCurrentDestination = (siteData, destinationName) =>{
  return currentDest = siteData.destinationsList.find((dest) =>(
    dest.name == destinationName
  ))
}

let resetForm = () =>{
  document.forms.bookingForm.reset( )
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

let warnUser =( msg) =>
{
  alert(msg)
}
let displayPrice = (currentDest, form) =>{

  console.log(document.forms.bookingForm.elements.departureDate)
  let depDate = document.forms.bookingForm.elements.departureDate.valueAsDate
  let endDate = document.forms.bookingForm.elements.endDate.valueAsDate
  let difference = endDate.getTime()- depDate.getTime() 

  if(difference <= 0)
  {
    warnUser("Votre date de retour doit être après votre date de départ !")
    return
  }
  let days = Math.ceil(difference / (1000 * 3600 * 24));
console.log(days*(form.elements.breakfast.checked ? 12 : 0))
  let sum =  (0.40*Number(form.elements.childrenNb.value) + Number(form.elements.adultsNb.value)) * (currentDest.displayedPrice + days*currentDest.perDayPrice + days*(form.elements.breakfast.checked ? 12 : 0) + days*(form.elements.dinner.checked ? 30 : 0)) 
  document.getElementById("priceDisplay").innerHTML = "Prix : " + sum.toFixed(2) + "€"
  document.forms.bookingForm.elements.price.value = sum.toFixed(2)
}

let checkIfSubmittable = () =>{
  let form = document.forms.bookingForm.elements

  let remainingFields = ""
  if(!form.nom.value)remainingFields += "Nom\n"
  if(!form.prenom.value)remainingFields += "Prénom\n"
  if(!form.mail.value)remainingFields += "E-mail\n"

  if(remainingFields != "")
  {
    alert("Certains champs n'ont pas été remplis et doivent l'être pour valider la réservation :\n" + remainingFields);
    return false
  }
  if(destinationName == "Yémen")
  {
    alert("En ce moment, vous ne pouvez pas aller au Yémen. Il a été détecté que vous êtes analyste financier.")
    return false
  }
  return true

}

let submitForm = () =>{
  if(checkIfSubmittable())
  {
    document.forms.bookingForm.submit()
  }

}


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const destinationName = urlParams.get('dest')
console.log(destinationName)



//recupération liste des destination

var request = new XMLHttpRequest();
request.open("GET", "../database/database.json", true);
request.onreadystatechange = ()=> {
  if(request.readyState == 4 && request.status == 200){
    var siteData = JSON.parse(request.responseText);

    let currentDestination = getCurrentDestination(siteData, destinationName)
    let currentTemperature = -273.15

    document.forms.bookingForm.elements.destinationName.value = destinationName

    //EVENTS
    document.forms.bookingForm.elements.adultsNb.addEventListener("change", ()=>{
      displayPrice(currentDestination, document.forms.bookingForm)
    })
    document.forms.bookingForm.elements.childrenNb.addEventListener("change", ()=>{
      displayPrice(currentDestination, document.forms.bookingForm)
    })
    document.forms.bookingForm.elements.departureDate.addEventListener("change", ()=>{
      displayPrice(currentDestination, document.forms.bookingForm)
    })
    document.forms.bookingForm.elements.endDate.addEventListener("change", ()=>{
      displayPrice(currentDestination, document.forms.bookingForm)
    })
    document.forms.bookingForm.elements.breakfast.addEventListener("change", ()=>{
      displayPrice(currentDestination, document.forms.bookingForm)
    })
    document.forms.bookingForm.elements.dinner.addEventListener("change", ()=>{
      displayPrice(currentDestination, document.forms.bookingForm)
    })


    //API 
    getDestinationTemperature(siteData, currentDestination).then((temp)=>{
      currentTemperature = temp
      console.log(currentTemperature)
      document.getElementById("infoTemperature").innerHTML = temp.toFixed(1) + '°C'
    }
    ).catch(console.error)

    //Reservation data fillling document
    document.getElementById("destinationName").innerHTML = currentDestination.name
    document.getElementById("pricePoint").innerHTML = "A partir de "+currentDestination.displayedPrice+" euros"
    document.getElementById("travelDescription").innerHTML = currentDestination.description

    document.getElementById("availability").innerHTML = "Disponibilité : " + currentDestination.availability
    document.getElementById("adultsMax").innerHTML = "Nombre de personnes : "+ currentDestination.adultsMax + " adultes max"
    document.getElementById("animalsAllowed").innerHTML = "Animaux : " +(currentDestination.animalsAllowed ? "Autorisés" : "Interdits")
    document.getElementById("breakfast").innerHTML = "Petit Déjeuner : " + (currentDestination.breakfastAvailable?"Oui" : "Non") 
    document.getElementById("dinner").innerHTML = "Diner : " + (currentDestination.dinnerAvailable ?"Oui" : "Non") 
    document.getElementById("travelPic").src = "../ressources/" + currentDestination.pictureFileName
    document.forms.bookingForm.elements.adultsNb.max = currentDestination.adultsMax 


    if(!currentDestination.animalsAllowed)
    {
      document.forms.bookingForm.elements.animalsNb.max = 0
    }
    if(!currentDestination.breakfastAvailable)
    {
      document.forms.bookingForm.elements.breakfast.disabled = true
    }
    if(!currentDestination.dinnerAvailable)
    {
      document.forms.bookingForm.elements.dinner.disabled = true
    }

    displayPrice(currentDestination, document.forms.bookingForm)


  }
}
request.send();

    
  
