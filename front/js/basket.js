
    let btn = document.getElementById('addToCart');
    //Récupération du bouton

    let products = fetch(`${BASEURL}/api/products`)
    // Récupération de la BDD
    .then(
        response => response.json().then(function(data){
            // Récupération de la promesse
            var params = new URLSearchParams(window.location.search);
             // Récupérer l'URL
             var urlId = params.get("id");
             // Récupérer l'ID

             {data.map((item) => {
                 // Dissection du tableau
                if(urlId === item._id){
                // Concordance id url et id tableau
                btn.addEventListener('click', () => {
                    setItems(item);
                });
                // Exécute la fonction au click du bouton
                    function setItems(item){
                        let colors = document.getElementById("colors").options[document.getElementById('colors').selectedIndex].text;
                        // Récupération de la couleur sélectionnée
                        let cartItems = localStorage.getItem('productsInCart');
                        // Récupération du panier
                        let stock = document.getElementById("quantity");
                        // Récupération de la quantité
                        cartItems = JSON.parse(cartItems);
                        // Passage de la donnée en donnée complexe

                        if(cartItems != null){
                            // Si le panier existe

                            if (cartItems[item.name] === undefined){
                                // Si le canapé n'existe pas
                                cartItems = { ...cartItems,
                                [item.name +" "+ colors]: [
                                    {"id" : `${item._id}`},
                                    {"name" : `${item.name}`},
                                    {"color" : colors},
                                    {"stock" : stock.value},
                                    {"price" : `${item.price}`}
                                ]};
                                // Création de l'article avec filtre couleur
                            }else{
                                console.log("Erreur")
                            }
                        }else{
                            // Si le panier existe pas
                            cartItems = { ...cartItems,
                                [item.name +" "+ colors]: [
                                    {"id" : `${item._id}`},
                                    {"name" : `${item.name}`},
                                    {"color" : colors},
                                    {"stock" : stock.value},
                                    {"price" : `${item.price}`}
                                ]};
                                // Création de l'article avec filtre couleur

                        }
                        localStorage.setItem("productsInCart", JSON.stringify(cartItems));
                        // Création du localstorage et passage en donnée simplifiée
                    }
                }else{
                    []
                    // Si l'ID de l'url de la page ne correspond pas avec l'ID du produit renvoi d'un tableau vide
                }

                
            })}
            }))

            

             