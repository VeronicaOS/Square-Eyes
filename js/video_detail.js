const movieDetail = document.querySelector(".movieDetail");
const resultsContainer = document.querySelector(".results");
const loading = document.querySelector(".loading");

let isLoading = true;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const movieId = urlParams.get("id");

async function getMovies() {
    try {
        const noroffUrl = "https://noroffcors.onrender.com/";
        const moviesUrl =
            "squareeyes.veronicaos.com/wp-json/wc/store/products/" + movieId;
        const url = noroffUrl + moviesUrl;
        const response = await fetch(url);
        return await response.json().then((response) => {
            if (response) isLoading = false;
            return response;
        });
    } catch (error) {
        resultsContainer.innerHTML = displayError("AN ERROR OCCURED");
    }
}

let hearts = JSON.parse(localStorage.getItem("HEARTS")) || [];
updateHearts();

async function getMovieDetail() {
    const movie = await getMovies();

    let movieGenres = "";
    movie.categories.map((category) => {
        movieGenres += category.name + " ";
    });
    if (isLoading) loading.innerHTML = "LOADING MOVIES...";
    else {
        movieDetail.innerHTML = `<div class="image-info">
                    <img class="movieImage" src="${
                        movie.images[0].src
                    }" alt="" />
                    <div class="row">
                        <p>${movie.tags[0].name}</p>
                        <p><hr /></p>
                        <p>12A</p>
                        <p><hr /></p>
                        <p>2h 39m</p>
                    </div>
                </div>
                <div class="synopsis">
                    <h1 class="synopsis-title">${movie.name}</h1>
                    <p>${movie.description}</p>
                    <div class="price">${Number(
                        movie.prices.price / 100
                    )} kr</div>
                    <div class="heart-purchase">
                        <a class="heart-btn" onclick="addToHearts('${
                            movie.id
                        }')" aria-label="Add to heart list"/>
                        <a class="cart-btn" onclick="addToCart('${
                            movie.id
                        }')"  aria-label="Add to cart">
                            <input type="button" value="Add to cart"/>
                        </a>
                    </div>
                </div>
                <div class="extra-info">
                    <p>
                        Genre: ${movieGenres}
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
                        <img src="images/Play.png" alt="Elvis: a dark haired man and woman looking as if they are about to kiss.">
                    </div>
                </div>
            </div>
            `;
        renderHeart(movieId);
    }
}
getMovieDetail();

function renderHeart(id) {
    const heartBtn = document.querySelector(".heart-btn");
    heartBtn.innerHTML = "";

    if (hearts.some((movie) => movie.id === id)) {
        heartBtn.innerHTML = '<i class="fa fa-heart fa-lg"/>';
    } else {
        heartBtn.innerHTML = '<i class="fa fa-heart-o fa-lg"/>';
    }
}

let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

async function addToCart(id) {
    const movie = await getMovies();
    if (cart.some((item) => item.id == id)) {
        alert("Product already in cart");
    } else {
        cart.push({
            ...movie,
        });
    }

    updateCart();
}

function updateCart() {
    localStorage.setItem("CART", JSON.stringify(cart));
    cartCount.innerHTML = cart.length;
}

function updateHearts() {
    localStorage.setItem("HEARTS", JSON.stringify(hearts));
}

async function addToHearts(id) {
    const movie = await getMovies();
    if (hearts.some((movie) => movie.id == id)) {
        hearts = hearts.filter((movie) => movie.id != id);
    } else {
        hearts.push({
            ...movie,
        });
    }
    updateHearts();
    renderHeart(id);
}
