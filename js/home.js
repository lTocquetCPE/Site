let displayDestinations = (siteData) =>{

  let regionRadios = document.filterForm.regionRadios
  let priceFilter = document.filterForm.rangePrix.value
  let region = "all"
  regionRadios.forEach((rad) =>{
    if(rad.checked)
    {
      region = rad.value
    }
  })

  let filteredDests = siteData.destinationsList.filter((elem)=>{

    if(elem.displayedPrice > priceFilter)
    {
      return false
    }
    if(region == "all")
    {
      return true
    }
    else if(elem.region == region)
    {
      return true
    }

    return false
  })

  document.getElementById("destinations").innerHTML = ""
  filteredDests.forEach((dest)=>{
    //Un peu de babelJS :)
    document.getElementById("destinations").innerHTML += `<span class="destination">
        <h1>${dest.name}</h1>
        <div id ="infoTemperature" class="travelInfoTemperature"></div>
        <div class="image">
        <a href="/html/reservation.html?dest=${ dest.name}">
          <img src="/ressources/${ dest.pictureFileName}" alt="destination" class="image" width=500 height=500/>
          <a/>
          <div class="reservez">
            <h2>Réservez</h2>
          </div>
        </div>
      </span>`
    })
  }


var request = new XMLHttpRequest();
request.open("GET", "../database/database.json", true);
request.onreadystatechange = ()=> {
  if(request.readyState == 4 && request.status == 200){
    var siteData = JSON.parse(request.responseText);

    console.log(siteData.destinationsList)

    //EVENTS
    document.filterForm.regionRadios.forEach(regionRadio =>{
      regionRadio.addEventListener('change', ()=>{

        displayDestinations(siteData)
      })
    })
    
    document.filterForm.rangePrix.onchange = ()=>{
      document.getElementById("priceFilterText").innerHTML = "Prix : " + document.filterForm.rangePrix.value
      displayDestinations(siteData)
    }

    displayDestinations(siteData)
    
    


  }
}
request.send();

// récupération de la température
let getCurrentDestination = (siteData, destinationName) =>{
  return currentDest = siteData.destinationsList.find((dest) =>(
    dest.name == destinationName
  ))
}

let getDestinationTemperature = (siteData, DestinationName) =>{
  return new Promise((resolve, reject) => {

    let city= getCurrentDestination(siteData,DestinationName).city
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

filteredDests.forEach((dest)=>{
  getDestinationTemperature(siteData, dest.name).then((temp)=>{
    currentTemperature = temp
    console.log(currentTemperature)
    document.getElementById("infoTemperature").innerHTML = temp.toFixed(1) + '°C'
  }
  ).catch(console.error)
})
