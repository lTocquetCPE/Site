

var request = new XMLHttpRequest();

let siteData;
let tryConnection = () =>{
  let userName = document.forms.coForm.elements.username.value
  let password = document.forms.coForm.elements.password.value

  let foundUser = siteData.usersList.find((usr)=>(
    usr.username == userName && usr.password == password
  ))
  if(foundUser)
  {
    localStorage.setItem("username", userName)
    localStorage.setItem("password", password)
    window.location.href = "../html/home.html";

  }
  else{
    alert("Erreur dans l'entrée du mot de passe et du nom d'utilisateur")
  }
}
request.open("GET", "../database/database.json", true);
request.onreadystatechange = ()=> {
  if(request.readyState == 4 && request.status == 200){
    siteData = JSON.parse(request.responseText);
   

  }
}
request.send();

    