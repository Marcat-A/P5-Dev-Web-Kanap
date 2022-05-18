

const BASEURL = "http://localhost:3000"
// URL de base

fetch(`${BASEURL}/api/products`)
// Récupération de la BDD
.then(
    response => response.json().then(function(data){
        // Récupération de la promesse
        var params = new URLSearchParams(window.location.search);
        // Récupérer l'URL
        var urlId = params.get("id");
        var title = document.getElementById('title');
        var price = document.getElementById('price');
        var description = document.getElementById('description');
        var image = document.querySelector('.item__img');
        var colors = document.getElementById('colors');
        var title = document.getElementById('title');
        // Récupération des points d'affichage
        
        {
            data.map((item) => {
                // Dissection du tableau
                
                if(urlId === item._id){
                    // Concordance de l'ID du canapé et de l'URL
                    return(
                    title.innerHTML = item.name,
                    price.innerHTML = item.price,
                    description.innerHTML = item.description,
                    image.innerHTML = `<img src="${item.imageUrl}" alt=${item.altTxt} /> `,
                    title.innerHTML = `Kanap - ${item.name}`,
                    item.colors.map((color) =>{colors.innerHTML += `<option value="${color}">${color}</option>`})
                    )
                    // Remplacement des divers objets 
                }else{
                    return("")
                    }
                    
            }
        )}
    })
)