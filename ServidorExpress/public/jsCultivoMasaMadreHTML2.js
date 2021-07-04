/**
 * Agregar un ítem al carrito de compras.
 */
document.querySelectorAll(".buttonAddtocart").forEach(function(button) {
    button.addEventListener("click", addItemToCart);
});

function addItemToCart(event) {
    // Obtenemos la lista actual de la memoria, si existe.
    let items = [];
    if (localStorage.getItem("cart-cultivo")) {
        // JSON.parse convierte un string a un objeto.
        items = JSON.parse(localStorage.getItem("cart-cultivo"));
        console.log(event.target);
    }

    // Cuando hace click en Icono , hace trigger del evento del Boton sobre Icono Agregar . Averiguar If While para arreglarlo 😡
    

    // Obtenemos el ítem actual de la pantalla.
    const button = event.target;

    // Agregamos el ítem a la lista guardada.
    items.push({
        price: button.dataset.price,
        name: button.dataset.name,
        image: button.dataset.image,
    });

    // Actualizamos la lista en memoria. LocalStorage solo acepta
    // strings como valor.
    localStorage.setItem("cart-cultivo", JSON.stringify(items));
}

/*
button.addEventListener("click", addItemToCart);

function addItemToCart (event) {
  fetch("http://localhost:3000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem('token')
    },
    body: JSON.stringify({price: items.dataset.price, items.dataset.name, items.dataset.image})
  }).then(function(response) {
    return response.json();
  })
  .then(function (responseJSON) {
    const NewProduct = responseJSON.NewProduct;
    
   ?? crearNuevaTareaHTML(tareaNueva.titulo, tareaNueva.prioridad, tareaNueva.autor); ??
  })
*/  

