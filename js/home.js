const heartList = document.querySelector(".heartList");
const heartListTitles = document.querySelector(".heartList-titles");
const forYou = document.querySelector(".forYouList");
const forYouTitles = document.querySelector(".forYou-titles");
const resultsContainer = document.querySelector(".results");
const loading = document.querySelector(".loading");

let isLoading = true;

function shuffleMovies(movies) {
    movies.forEach((movie, index) => {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        const temp = movies[index];
        movies[index] = movies[randomIndex];
        movies[randomIndex] = temp;
    });
    return movies;
}

async function fetchMovies() {
    try {
        const noroffUrl = "https://noroffcors.onrender.com/";
        const moviesUrl = "squareeyes.veronicaos.com/wp-json/wc/store/products";
        const url = noroffUrl + moviesUrl;
        const response = await fetch(url);
        const movies = await response.json().then((response) => {
            if (response) {
                isLoading = false;
            }
            return response;
        });

        if (isLoading) loading.innerHTML = "LOADING MOVIES...";
        else {
            movies;
            let filteredMovies = [];
            movies.map((movie) =>
                movie.categories.map((category) => {
                    if (
                        category.name === "Comedy" ||
                        category.name === "Fantasy" ||
                        category.name === "Biography"
                    ) {
                        if (filteredMovies.includes(movie)) {
                        } else {
                            filteredMovies.push(movie);
                        }
                    }
                })
            );
            filteredMovies.forEach((movie) => {
                heartList.innerHTML += `<a href="video_detail.html?id=${movie.id}"><img class="movie" src="${movie.images[0].src}"/></a>`;
                heartListTitles.innerHTML += `<div class="title">${movie.name}</div>`;
            });

            const shuffledMovies = shuffleMovies(movies);

            shuffledMovies.slice(0, 7).forEach((movie) => {
                forYou.innerHTML += `<a href="video_detail.html?id=${movie.id}"><img class="movie" src="${movie.images[0].src}"/></a>`;
                forYouTitles.innerHTML += `<div class="title">${movie.name}</div>`;
            });
        }
    } catch (error) {
        resultsContainer.innerHTML = displayError("AN ERROR OCCURED");
    }
}
fetchMovies();
