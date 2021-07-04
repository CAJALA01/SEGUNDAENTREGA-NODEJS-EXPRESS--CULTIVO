/**
 * Pintamos la lista de ítems del carrito.
 */

function drawCart() {
   // Obtenemos la lista actual de la memoria, si existe.
   let items = [];
   if (localStorage.getItem("cart-cultivo")) {
       items = JSON.parse(localStorage.getItem("cart-cultivo"));
   }
   
    // Eliminamos la lista de la pantalla.
    const cartItems = document.getElementsByClassName("cart-items")[0]
    cartItems.innerHTML = '';

   // Si no hay ítems, no pintamos nada.
   if (items.length === 0) {
       return;
   }

    // Pintamos los ítems que haya.
    items.forEach(function (item) {
        const row = `
            <div class="cart-item cart-column">
                <img class="cart-item-image" src="./imagenes/${item.image}" width="100" height="100">
                <div><span class="cart-item-title">${item.name}</span>
            
                <span class="cart-price">$ ${item.price}</span>
                <div class="cart-quantity">
                    <input class="cart-quantity-input" type="number" min="1" value="1">
                    <button class="buttonRemove" data-name="${item.name}" type="button">BORRAR</button>
                </div>
            </div>`;

        const cartRow = document.createElement("div");
        cartRow.classList.add("cart-row")
        cartRow.innerHTML = row;
        cartRow.getElementsByClassName("buttonRemove")[0].addEventListener("click", removeItemFromCart)
        cartItems.append(cartRow)
    });
}

drawCart();

/**
 * Pintamos el precio total.
 */

 function drawTotalPrice() {
    // Obtenemos la lista actual de la memoria, si existe.
    let items = [];
    if (localStorage.getItem("cart-cultivo")) {
        items = JSON.parse(localStorage.getItem("cart-cultivo"));
    }
 
    // Sumamos el precio total.
    let price = 0;
    items.forEach(function (item) {
        price = price + parseFloat(item.price);
    });

    document.querySelector(".cart-total-price").innerText = "$ " + price;
 }

 drawTotalPrice();

/**
 * Eliminar un ítem del carrito de compras.
 */
 document.querySelectorAll(".buttonRemove").forEach(function(button) {
    button.addEventListener("click", removeItemFromCart);
});

function removeItemFromCart(event) {
    // Obtenemos la lista actual de la memoria, si existe.
    let items = [];
    if (localStorage.getItem("cart-cultivo")) {
        items = JSON.parse(localStorage.getItem("cart-cultivo"));
    }

    // Obtenemos el ítem actual de la pantalla.
    const button = event.target;

    // Eliminamos el ítem de la lista guardada.
    items.forEach(function(item, index) {
        if (item.name === button.dataset.name) {
            items.splice(index, 1);
        }
    });

    // Actualizamos la lista en memoria.
    localStorage.setItem("cart-cultivo", JSON.stringify(items));
    drawCart();
    drawTotalPrice();
}

