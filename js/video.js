const ratingList = document.querySelector(".ratingList");
const ratingTitles = document.querySelector(".rating-titles");
const newList = document.querySelector(".newList");
const newTitles = document.querySelector(".new-titles");
const actionList = document.querySelector(".actionList");
const actionTitles = document.querySelector(".action-titles");
const topList = document.querySelector(".topList");
const topTitles = document.querySelector(".top-titles");
const resultsContainer = document.querySelector(".results");
const loading = document.querySelector(".loading");

let isLoading = true;

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
                .sort((a, b) => Number(b.rating) - Number(a.rating))
                .forEach((movie) => {
                    ratingList.innerHTML += `<a href="video_detail.html?id=${movie.id}"><img class="movie" src="${movie.image}"/></a>`;
                    ratingTitles.innerHTML += `<div class="title">${movie.title}</div>`;
                });

            movies
                .filter((movie) => movie.genre === "Action")
                .forEach((movie) => {
                    actionList.innerHTML += `<a href="video_detail.html?id=${movie.id}"><img class="movie" src="${movie.image}"/></a>`;
                    actionTitles.innerHTML += `<div class="title">${movie.title}</div>`;
                });

            movies
                .sort((a, b) => Number(b.released) - Number(a.released))
                .forEach((movie) => {
                    newList.innerHTML += `<a href="video_detail.html?id=${movie.id}"><img class="movie" src="${movie.image}"/></a>`;
                    newTitles.innerHTML += `<div class="title">${movie.title}</div>`;
                });

            movies
                .filter(
                    (movie) =>
                        movie.genre === "Comedy" ||
                        movie.genre === "Drama" ||
                        movie.genre === "Horror"
                )
                .forEach((movie, index) => {
                    topList.innerHTML += `<img
                                        id="nmbr"
                                        src="images/Top 5/${index + 1}.png"
                                        alt="The number ${
                                            index + 1
                                        } in bold orange"/> 
                                        <a href="video_detail.html?id=${
                                            movie.id
                                        }"><img class="movie" src="${
                        movie.image
                    }"/></a>`;
                    topTitles.innerHTML += `<div class="title">${movie.title}</div>`;
                });
        }
    } catch (error) {
        resultsContainer.innerHTML = displayError("AN ERROR OCCURED");
    }
}
fetchMovies();
