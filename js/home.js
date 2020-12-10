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
      <p>Température</p>
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