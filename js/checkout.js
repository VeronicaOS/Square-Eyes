const cartItems = document.querySelector(".cart-items");
const subtotal = document.querySelector(".subtotal");

let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

function updateCart() {
    renderCartItems();
    renderSubtotal();

    localStorage.setItem("CART", JSON.stringify(cart));
}
updateCart();

function renderCartItems() {
    cartItems.innerHTML = "";
    cart.forEach((movie) => {
        cartItems.innerHTML += `
      <div class="cart-movie">
      <div class="movie">
      <img
          src=${movie.image}
          alt=""
      />
      <a class="cart-btn" onclick="removeItemFromCart('${movie.id}')"  aria-label="Remove from cart">
          <input type="button" value="REMOVE"></a>
      </a>
      </div>
      <div class="movie-info">
          <p class="title">${movie.title}</p>
          <p class="price1">${movie.price} kr</p> 
      </div>
      </div>
      <div class="border"></div>
        `;
    });
}
renderCartItems();

function removeItemFromCart(id) {
    cart = cart.filter((item) => item.id !== id);
    cartCount.innerHTML = cart.length;

    updateCart();
}

function renderSubtotal() {
    let totalPrice = 0,
        totalItems = 0;

    cart.forEach((movie) => {
        totalPrice += movie.price;
        totalItems = cart.length;
    });

    subtotal.innerHTML = `Subtotal (${totalItems} items): ${totalPrice.toFixed(
        2
    )} kr`;
}
// renderSubtotal();
