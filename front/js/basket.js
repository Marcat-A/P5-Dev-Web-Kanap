// Récupération de l'id
const str = window.location;
const url = new URL(str);
const productId = url.searchParams.get("id");
// Ajout d'un produit au panier
function addToCart(productItem) {
  // Récupération du panier
  let cartItems = localStorage.getItem("cartItems");
  // Si le panier vide création du panier avec l'objet
  if (cartItems === null) {
    let items = [productItem];
    let itemsStr = JSON.stringify(items);
    localStorage.setItem("cartItems", itemsStr);
    alert("Produit ajouté au panier !");
  } else {
    // Si le panier contient des produits de même id et même couleur
    let items = JSON.parse(cartItems);
    const resultat = items.find((product) => {
      if (product.id === productItem.id && product.color === productItem.color){
          return true;
        }else{
            return false;
        }
    });

    if (resultat != undefined) {
      items = items.map((item) => {
        if (item.id === productItem.id && item.color === productItem.color) {
          item.quantity += productItem.quantity;
        }

        return item;
      });
    } else {
      // Si le panier contient des produits différents
      items.push(productItem);
    }
    let itemsStr = JSON.stringify(items);
    localStorage.setItem("cartItems", itemsStr);
    alert("Produit ajouté au panier !");
  }
}


  // Click du bouton
  const cartButton = document.getElementById("addToCart");
  cartButton.addEventListener("click", (e) => {
    e.preventDefault();
    let productColor = document.getElementById("colors").value;
    let productQuantity = parseInt(document.getElementById("quantity").value);
    // Si aucune couleur sélectionnée
    if (productColor == "") {
      alert("Veuillez sélectionner une couleur");
      return;
    }
    // Si quantité non renseignée
    if (productQuantity <= 0) {
      alert("Veuillez renseigner une quantité valide");
      return;
    // Si quantité supérieure à 100
    } else if (productQuantity > 100) {
      alert("La quantité maximale autorisée est de 100");
      return;
    }
    // Création d'un tableau contenant l'id, la couleur et la quantité du produit ajouté
    const productOptions = {
      id: productId,
      color: productColor,
      quantity: productQuantity,
    };
    addToCart(productOptions);
  });