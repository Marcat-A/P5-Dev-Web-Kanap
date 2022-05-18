const BASEURL = "http://localhost:3000"
// URL de base

fetch(`${BASEURL}/api/products`)
// Récupération de la BDD
.then(
    response => response.json().then(function(data){
        // Récupération de la promesse
        const items = document.getElementById('items');
        // Récupération du point d'affichage
        {data.map((item) => (
            // Dissection du tableau
           items.innerHTML += `<a href="./product.html?${item._id}">
           <article>
             <img src="${item.imageUrl}" alt="Lorem ipsum dolor sit amet, ${item.name}" />
              <h3 class="productName">${item.name}</h3>
              <p class="productDescription">${item.description}</p>
            </article>
           </a>`
           // Ajout des objets avec les différentes variables
        ))}
    })
)