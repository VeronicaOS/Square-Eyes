const ratingList = document.querySelector(".ratingList");
const newList = document.querySelector(".newList");
const actionList = document.querySelector(".actionList");
const topList = document.querySelector(".topList");
const resultsContainer = document.querySelector(".results");

async function fetchMovies() {
    try {
        const response = await fetch(
            "https://api.noroff.dev/api/v1/square-eyes"
        );
        const movies = await response.json();

        console.log(movies);

        movies
            .sort((a, b) => Number(b.rating) - Number(a.rating))
            .forEach((movie) => {
                ratingList.innerHTML += `<a href="video_detail.html?id=${movie.id}"><img class="movie" src="${movie.image}"/></a>`;
            });

        movies
            .filter((movie) => movie.genre === "Action")
            .forEach((movie) => {
                actionList.innerHTML += `<a href="video_detail.html?id=${movie.id}"><img class="movie" src="${movie.image}"/></a>`;
            });

        movies
            .sort((a, b) => Number(b.released) - Number(a.released))
            .forEach((movie) => {
                newList.innerHTML += `<a href="video_detail.html?id=${movie.id}"><img class="movie" src="${movie.image}"/></a>`;
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
            alt="The number ${index + 1} in bold orange"/> 
            <a href="video_detail.html?id=${
                movie.id
            }"><img class="movie" src="${movie.image}"/></a>`;
            });
    } catch (error) {
        console.log("An error occurred");
        resultsContainer.innerHTML = displayError("An error occurred");
    }
}
fetchMovies();
