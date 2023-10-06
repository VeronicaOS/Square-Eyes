const movieDetail = document.querySelector(".movieDetail");
const resultsContainer = document.querySelector(".results");
const loading = document.querySelector(".loading");

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

async function getMovieDetail() {
    const movies = await getMovies();
    console.log(movies);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const movieId = urlParams.get("id");
    const movie = movies.filter((movie) => movie.id === movieId)[0];
    // console.log(movie);
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

// function save (key, value) {
//     const encodedValue = JSON.stringify(value);
//     localStorage.setItem(key, encodedValue);
// }

// function load (key) {
//     const encodedValue = localStorage.getItem(key);
//     return JSON.parse(encodedValue);
// }

// function remove (key) {
//     localStorage.removeItem(key);
// }

// function addToCart (event) {
//     const button = event.target;
//     const id = button.dataset.id;

//     let cart = load("cart") || [];
//     cart.push(id);

//     save("cart", cart);
// }

// function renderCart () {}

// function cartButton () {
//     const buttons = document.querySelectorAll("cart-btn")

//     buttons.forEach(button => {
//         button.addEventListener("click", addToCart)
//     })
// console.log(buttons)
// }
// cartButton()

let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

async function addToCart(id) {
    const movies = await getMovies();
    console.log(id);
    if (cart.some((item) => item.id === id)) {
        alert("Product already in cart");
    } else {
        const movie = movies.find((movie) => movie.id === id);

        cart.push({
            ...movie,
            numberOfMovies: 1,
        });
        console.log(cart);
    }

    updateCart();
}

function updateCart() {
    localStorage.setItem("CART", JSON.stringify(cart));
    cartCount.innerHTML = cart.length;
    console.log(cart);
}
updateCart();
