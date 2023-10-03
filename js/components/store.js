let removeCartItemButtons = document.getElementsByClassName("btn-remove");

for (var i = 0; i < removeCartItemButtons.length; i++) {
    let button = removeCartItemButtons[i];
    button.addEventListener("click", function (event) {
        let buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.remove();
    });
}



// function addToCart() {
//     let addToCartButtons = document.getElementsByClassName("cart-btn");
//     for (let i = 0; i < addToCartButtons.length; i++) {
//     let button = addToCartButtons[i];
//     button.addEventListener("click", addToCartClicked);
// }
// }



// function addToCartClicked(event) {
//     let button = event.target;
//     let shopItem = button.parentElement.parentElement;
//     let title = shopItem.getElementsByClassName("synopsis-title")[0].innerText;
//     console.log(title)
// }




// let basket = JSON.parse(localStorage.getItem("data")) || [];

// let calculation = () => {
//     let cartIcon = document.getElementById("count");
//     cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
//   };
  
//   calculation();

