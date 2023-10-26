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
            movies
                .sort(
                    (a, b) =>
                        Number(b.attributes[0].terms[0].name) -
                        Number(a.attributes[0].terms[0].name)
                )
                .forEach((movie) => {
                    ratingList.innerHTML += `<a href="video_detail.html?id=${movie.id}"><img class="movie" src="${movie.images[0].src}"/></a>`;
                    ratingTitles.innerHTML += `<div class="title">${movie.name}</div>`;
                });

            // if (isLoading) loading.innerHTML = "LOADING MOVIES...";
            // else
            // const sortedMovies = movies
            //     .sort((a, b) => {
            //         const aName = Number(a.attributes[0].terms[0].name);
            //         const bName = Number(b.attributes[0].terms[0].name);

            //         if (aName > bName) {
            //             return 1;
            //         } else if (bName > aName) {
            //             return -1;
            //         } else return 0;
            //     })
            //     .forEach((movie) => {
            //         console.log(movie);
            //         ratingList.innerHTML += `<a href="video_detail.html?id=${movie.id}"><img class="movie" src="${movie.images[0].src}"/></a>`;
            //         ratingTitles.innerHTML += `<div class="title">${movie.name}</div>`;
            //     });

            // console.log(sortedMovies);

            movies
                .filter((movie) => movie.categories[0].name === "Action")
                .forEach((movie) => {
                    actionList.innerHTML += `<a href="video_detail.html?id=${movie.id}"><img class="movie" src="${movie.images[0].src}"/></a>`;
                    actionTitles.innerHTML += `<div class="title">${movie.name}</div>`;
                });

            // movies
            //     .sort(
            //         (a, b) => Number(b.tags[0].names) - Number(a.tags[0].names)
            //     )
            //     .forEach((movie) => {
            //         newList.innerHTML += `<a href="video_detail.html?id=${movie.id}"><img class="movie" src="${movie.images[0].src}"/></a>`;
            //         newTitles.innerHTML += `<div class="title">${movie.name}</div>`;
            //     });

            movies.reverse().forEach((movie) => {
                newList.innerHTML += `<a href="video_detail.html?id=${movie.id}"><img class="movie" src="${movie.images[0].src}"/></a>`;
                newTitles.innerHTML += `<div class="title">${movie.name}</div>`;
            });

            let filteredMovies = [];
            movies.map((movie) =>
                movie.categories.map((category) => {
                    if (
                        category.name === "Action" ||
                        category.name === "Drama" ||
                        category.name === "Horror"
                    ) {
                        if (filteredMovies.includes(movie)) {
                        } else {
                            if (filteredMovies.length < 5) {
                                filteredMovies.push(movie);
                            }
                        }
                    }
                })
            );

            filteredMovies.forEach((movie, index) => {
                topList.innerHTML += `<img
                    id="nmbr"
                    src="images/Top 5/${index + 1}.png"
                    alt="The number ${index + 1} in bold orange"/>
                    <a href="video_detail.html?id=${
                        movie.id
                    }"><img class="movie" src="${movie.images[0].src}"/></a>`;
                topTitles.innerHTML += `<div class="title">${movie.name}</div>`;
            });
        }
    } catch (error) {
        resultsContainer.innerHTML = displayError("AN ERROR OCCURED");
    }
}

fetchMovies();
