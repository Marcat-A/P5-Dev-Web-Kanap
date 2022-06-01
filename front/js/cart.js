// Initialisation du localstorage
let itemsInLocalStorage = JSON.parse(localStorage.getItem("cartItems"));

// Affichage du contenu du panier
async function displayCart() {
  const parser = new DOMParser();
  const positionEmptyCart = document.getElementById("cart__items");
  let cartArray = [];

  // Si le localstorage est vide
  if (itemsInLocalStorage === null || itemsInLocalStorage == 0) {
    positionEmptyCart.innerHTML = "<p class='empty'>Votre Panier est vide :(</p>";
    document.getElementById("totalQuantity").innerHTML = "0";
    document.getElementById("totalPrice").innerHTML = "0";
  } else {
    // Si le localstorage contient des produits
    for (i = 0; i < itemsInLocalStorage.length; i++) {
      const product = await getProductById(itemsInLocalStorage[i].id);
      const totalPriceItem = (product.price *= itemsInLocalStorage[i].quantity);
      cartArray += `
       <article class="cart__item" data-id=${itemsInLocalStorage[i].id}>
       <div class="cart__item__img">
         <img src="${product.imageUrl}" alt="Photographie d'un canapé">
       </div>
       <div class="cart__item__content">
         <div class="cart__item__content__titlePrice">
           <h2>${product.name}</h2>
           <p>${itemsInLocalStorage[i].color}</p>
           <p>
           
           ${totalPriceItem} €</p>
         </div>
         <div class="cart__item__content__settings">
           <div class="cart__item__content__settings__quantity">
             <p>Qté : </p>
             <input data-id= ${itemsInLocalStorage[i].id} data-color= ${itemsInLocalStorage[i].color} type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${itemsInLocalStorage[i].quantity}>
           </div>
           <div class="cart__item__content__settings__delete">
             <p data-id= ${itemsInLocalStorage[i].id} data-color= ${itemsInLocalStorage[i].color} class="deleteItem">Supprimer</p>
           </div>
         </div>
       </div>
     </article>
     `;
    }
    // Affichage du nombre total d'articles et du prix total du panier
    let totalQuantity = 0;
    let totalPrice = 0;
    for (i = 0; i < itemsInLocalStorage.length; i++) {
      const article = await getProductById(itemsInLocalStorage[i].id);
      totalQuantity += parseInt(itemsInLocalStorage[i].quantity);
      totalPrice += parseInt(article.price * itemsInLocalStorage[i].quantity);
    }
    document.getElementById("totalQuantity").innerHTML = totalQuantity;
    document.getElementById("totalPrice").innerHTML = totalPrice;
    if (i == itemsInLocalStorage.length) {
      const displayBasket = parser.parseFromString(cartArray, "text/html");
      positionEmptyCart.appendChild(displayBasket.body);
      changeQuantity();
      deleteItem();
    }
  }
}
// Récupération des produits de l'API
async function getProductById(productId) {
  return fetch("http://localhost:3000/api/products/" + productId)
    .then(function (res) {
      return res.json();
    })
    .catch((err) => {
      // Une erreur est survenue
      console.log(err);
    })
    .then(function (response) {
      return response;
    });
}
displayCart();

// Modification de la quantité
function changeQuantity() {
  const quantityInputs = document.querySelectorAll(".itemQuantity");
  quantityInputs.forEach((quantityInput) => {
    quantityInput.addEventListener("change", (event) => {
      event.preventDefault();
      const inputValue = event.target.value;
      const dataId = event.target.getAttribute("data-id");
      const dataColor = event.target.getAttribute("data-color");
      let cartItems = localStorage.getItem("cartItems");
      let items = JSON.parse(cartItems);

      items = items.map((item) => {
        if (item.id === dataId && item.color === dataColor) {
          item.quantity = inputValue;
        }
        return item;
      });

      if (inputValue > 100) {
        alert("La quantité maximale autorisée est de 100");
        location.reload();
        return;
      }
      let itemsStr = JSON.stringify(items);
      localStorage.setItem("cartItems", itemsStr);
      location.reload();
    });
  });
}

// Suppression d'un article
function deleteItem() {
  const deleteButtons = document.querySelectorAll(".deleteItem");
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      const deleteId = event.target.getAttribute("data-id");
      const deleteColor = event.target.getAttribute("data-color");
      itemsInLocalStorage = itemsInLocalStorage.filter(
        (element) => !(element.id == deleteId && element.color == deleteColor)
      );
      deleteConfirm = window.confirm(
        "Etes vous sûr de vouloir retirer cet article de votre panier?"
      );
      if (deleteConfirm == true) {
        localStorage.setItem("cartItems", JSON.stringify(itemsInLocalStorage));
        location.reload();
        alert("Article retiré du panier");
      }
    });
  });
}