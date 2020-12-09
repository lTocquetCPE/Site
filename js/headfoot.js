// Deux fonctions pour charger le header et le footer
// Pour éviter de surcharger le html et le rendre plus lisible

//Fontion ajoutant le header
function AddHeader (){
    document.getElementById("myheader").innerHTML = WriteHeader()
}

//fonction écrivant le header
function WriteHeader(){
    return '<a href="home.html">'
    +'<div class="headerButton">'
    +  '<img src="../ressources/home.png" alt="Icone de retour à la page accueil" />'
    +  'Accueil'
    +'</div>'
    +'</a>'
    +'<div class="logoDiv">'
    +'<img src="../ressources/logo.png" alt="Logo de Voyage Bleu" />'
    +'</div>'
    +'<div class="rightHeaderButtons">'
    +'<a href="connexion.html">'
    +'<div class="headerButton">'
    +    '<img src="../ressources/login.png" alt="Icone de connexion" />'
    +    'Connexion'
    +  '</div>'
    +'</a>'
    +'<a href="panier.html">'
    +  '<div class="headerButton">'
    +    '<img src="../ressources/panier.png" alt="Icone accès au panier" />'
    +    'Panier'
    + '</div>'
    +'</a>'
    +'</div>'
}

//fonction ajoutant le footer
function AddFooter(){
    document.getElementById("myFooter").innerHTML=WriteFooter()
}

//fonction ecrivant le footer
function WriteFooter(){
    return '<img src="../ressources/logo.png" class="logoFoot" alt="" />'
    +'<a href="contactus.html"><h3>A propos & Contacts</h3></a>'
}