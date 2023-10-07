const cartCount = document.querySelector(".count");

cart = JSON.parse(localStorage.getItem("CART")) || [];
cartCount.innerHTML = cart.length;