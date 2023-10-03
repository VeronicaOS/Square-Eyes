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
        const response = await fetch(
            "https://api.noroff.dev/api/v1/square-eyes"
        );
        const movies = await response.json().then((response) => {
            if (response) {
                isLoading = false;
            }
            return response;
        });

        if (isLoading) loading.innerHTML = "LOADING MOVIES...";
        else {
            movies
                .filter(
                    (movie) =>
                        movie.genre === "Comedy" ||
                        movie.genre === "Kids" ||
                        movie.genre === "Horror"
                )
                .forEach((movie) => {
                    heartList.innerHTML += `<a href="video_detail.html?id=${movie.id}"><img class="movie" src="${movie.image}"/></a>`;
                    heartListTitles.innerHTML += `<div class="title">${movie.title}</div>`;
                });

            const shuffledMovies = shuffleMovies(movies);

            shuffledMovies.slice(0, 7).forEach((movie) => {
                forYou.innerHTML += `<a href="video_detail.html?id=${movie.id}"><img class="movie" src="${movie.image}"/></a>`;
                forYouTitles.innerHTML += `<div class="title">${movie.title}</div>`;
            });
        }
    } catch (error) {
        resultsContainer.innerHTML = displayError("AN ERROR OCCURED");
    }
}
fetchMovies();
