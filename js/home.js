
var request = new XMLHttpRequest();
request.open("GET", "../database/database.json", true);
request.onreadystatechange = ()=> {
  if(request.readyState == 4 && request.status ==200){
    var siteData = JSON.parse(request.responseText);



    siteData.destinationsList.forEach((dest)=>{
    //Un peu de babelJS :)
      document.getElementById("destinations").innerHTML += ```<span class="destination">
      <h1>${dest.name}</h1>
      <p>Température</p>
      <div class="image">
        <img src="/ressources/${dest.pictureFileName}" alt="destination" class="image" width=500 height=500/>
        <div class="reservez">
          <h2>Réservez</h2>
        </div>
      </div>
    </span>```
    
    })
    


  }
}
request.send();

