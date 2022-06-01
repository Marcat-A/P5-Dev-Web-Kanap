// Variables regex pour la validation des données
let regexName = /^[a-zA-ZÀ-Ÿ-. ]*$/;
let regexAddress = /^[0-9a-zA-Z\s,.'-çñàéèêëïîôüù]{3,}$/;
let regexEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
// Récupération du formulaire
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");
// Validation du prénom
firstName.addEventListener('change', (e)=>{
    e.preventDefault();
    let firstNameError = document.getElementById("firstNameErrorMsg");
    if(!regexName.test(firstName.value)){
        firstNameError.innerHTML = "Prénom non valide \u274c"
        return false;
    }else{
        firstNameError.innerHTML = "Prénom valide \u2705"
        return true;
    }
});
// Validation du nom
lastName.addEventListener('change', (e)=>{
    e.preventDefault();
    let lastNameError = document.getElementById("lastNameErrorMsg");
    if(!regexName.test(lastName.value)){
        lastNameError.innerHTML = "Nom non valide \u274c"
        return false;
    }else{
        lastNameError.innerHTML = "Nom valide \u2705"
        return true;
    }
});
// Validation de l'adresse
address.addEventListener('change', (e)=>{
    e.preventDefault();
    let addressError = document.getElementById("addressErrorMsg");
    if(!regexAddress.test(address.value)){
        addressError.innerHTML = "Adresse non valide \u274c"
        return false;
    }else{
        addressError.innerHTML = "Adresse valide \u2705"
        return true;
    }
});
// Validation de la ville
city.addEventListener('change', (e)=>{
    e.preventDefault();
    let cityError = document.getElementById("cityErrorMsg");
    if(!regexAddress.test(city.value)){
        cityError.innerHTML = "Ville non valide \u274c"
        return false;
    }else{
        cityError.innerHTML = "Ville valide \u2705"
        return true;
    }
});
// Validation de l'email
email.addEventListener('change', (e)=>{
    e.preventDefault();
    let emailError = document.getElementById("emailErrorMsg");
    if(!regexEmail.test(email.value)){
        emailError.innerHTML = "Email non valide \u274c"
        return false;
    }else{
        emailError.innerHTML = "Email valide \u2705"
        return true;
    }
});
// Validation du formulaire
let order = document.getElementById("order");
order.addEventListener("click", (e) =>{
    e.preventDefault();
    let cartItems = localStorage.getItem("cartItems");
    if(cartItems === null){
        alert("Merci de rajouter des produits dans votre panier avant de passer commande.")
    }else{
        let contact = {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value,
            };
        // Vérification que les données ne sont pas vides
            if(firstName.value === "" ||
            lastName.value === "" ||
            address.value === "" ||
            city.value === "" ||
            email.value === ""){
            alert("Merci de renseigner les champs présents pour passer la commande");
            }
        // Vérification que les données sont valides
            else if(regexName.test(firstName.value) == false ||
            regexName.test(lastName.value) == false ||
            regexAddress.test(address.value) == false ||
            regexAddress.test(city.value) == false ||
            regexEmail.test(email.value) == false){
            alert("Les données ne sont pas renseignées correctement");
            }else {
                // Créations des tableaux à envoyer à l'API
                let products = [];
                itemsInLocalStorage.forEach((order) => {
                  products.push(order.id);
                });
                let pageOrder = { contact, products };
                // Appel à l'API pour envoyer la commande et le contact
                fetch("http://localhost:3000/api/products/order", {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                  },
                  body: JSON.stringify(pageOrder),
                })
                // Récupération de la réponse
                  .then((res) => {
                    return res.json();
                  })
                // Envoi du client sur la page de confirmation et suppression du panier
                  .then((confirm) => {
                    window.location.href = "./confirmation.html?orderId=" + confirm.orderId;
                    localStorage.clear();
                  })
                  .catch((error) => {
                    console.log(error);
                  });
            }

    }
})