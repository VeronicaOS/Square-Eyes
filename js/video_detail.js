const movieDetail = document.querySelector(".movieDetail");
const resultsContainer = document.querySelector(".results");
const loading = document.querySelector(".loading");
const cartCount = document.querySelector(".count");
const cartItems = document.querySelector(".cart-items");
const subtotal = document.querySelector(".subtotal");

let isLoading = true;

async function getMovies() {
    try {
        const response = await fetch(
            "https://api.noroff.dev/api/v1/square-eyes"
        );
        return await response.json().then((response) => {
            if (response) isLoading = false;
            return response;
        });
    } catch (error) {
        resultsContainer.innerHTML = displayError("AN ERROR OCCURED");
    }
}

// const movies = await getMovies();
// const movie = movies.filter((movie) => movie.id === movieId)[0];

async function getMovieDetail() {
    const movies = await getMovies();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const movieId = urlParams.get("id");
    const movie = movies.filter((movie) => movie.id === movieId)[0];
    console.log(movie);
    if (isLoading) loading.innerHTML = "LOADING MOVIES...";
    else {
        movieDetail.innerHTML = `<div class="image-info">
                    <img class="movieImage" src=${movie.image} alt="" />
                    <div class="row">
                        <p>${movie.released}</p>
                        <p><hr /></p>
                        <p>12A</p>
                        <p><hr /></p>
                        <p>2h 39m</p>
                    </div>
                </div>
                <div class="synopsis">
                    <h1 class="synopsis-title">${movie.title}</h1>
                    <p>${movie.description}</p>
                    <div class="price">NOK ${movie.price}</div>
                    <div class="heart-purchase">
                        <a href="#" aria-label="orange heart icon/liked list">
                            <i class="fa fa-heart-o fa-lg" aria-hidden="true"></i>
                        </a>
                        <a class="cart-btn" onclick="addToCart('${movie.id}')"  aria-label="Add to cart">
                            <input type="button" value="Add to cart"></a>
                        </a>
                    </div>
                </div>
                <div class="extra-info">
                    <p>
                        Genre: ${movie.genre}
                    </p>
                    <ul class="list">
                        <li><a>Stars: </a></li>
                        <li><a>Austin Butler</a></li>
                        <li><a>Tom Hanks</a></li>
                        <li><a>Olivia DeJonge</a></li>
                    </ul>
                    <p>
                        Director: Baz Luhrmann
                    </p>
                </div>
                <div class="trailer">
                    <h2>Trailer</h2>
                    <div class="trailer1">
                        <img src=${movie.image} alt="Elvis: a dark haired man and woman looking as if they are about to kiss.">
                        <img src="images/Play.png" class="img-top" alt="Elvis: a dark haired man and woman looking as if they are about to kiss with a play icon on top of the image.">
                    </div>
                </div>
            </div>
            `;
    }
}
getMovieDetail();

let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

async function addToCart(id) {
    const movies = await getMovies();
    console.log(id);
    if (cart.some((item) => item.id === id)) {
        alert("Product already in cart"); //hvorfor fungerer ikke dette?
    } else {
        const movie = movies.find((movie) => movie.id === id);

        cart.push({
            ...movie,
            numberOfMovies : 1
        });
    }

    updateCart();
}

function updateCart() {
    renderSubtotal();
    renderCartItems();

    localStorage.setItem("CART", JSON.stringify(cart));
    console.log(cart);
}
updateCart();

function renderSubtotal() {
    let totalPrice = 0,
        totalItems = 0;

    cart.forEach((movie) => {
        totalPrice += movie.price * movie.numberOfMovies;
        totalItems += movie.numberOfMovies;
    });

    subtotal.innerHTML = `Subtotal (${totalItems} items): NOK ${totalPrice}`;
    // totalItemsInCartEl.innerHTML = totalItems;
}
renderSubtotal();

function renderCartItems() {
    cartItems.innerHTML = ""; // clear cart element
    cart.forEach((movie) => {
        cartItems.innerHTML += `
      <div class="cart-movie">
      <img
          src=${movie.image}
          alt=""
      />
      <div class="movie-info">
          <button type="button" class="btn btn-remove">
              REMOVE
          </button>
          <p class="title">${movie.title}</p>
          <p class="price1">NOK ${movie.price}</p> 
      </div>
      </div>
      <div class="border"></div>
        `;
    });
}
renderCartItems();

// HUSK Å FINNE EN MÅTE Å KORTE FILM TITLENE PÅ
