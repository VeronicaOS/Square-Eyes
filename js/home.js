const heartList = document.querySelector(".heartList");
const forYou = document.querySelector(".forYouList");

async function fetchMovies() {
    const response = await fetch("https://api.noroff.dev/api/v1/square-eyes");
    const movies = await response.json();

    console.log(movies);

    movies
        .filter(
            (movie) =>
                movie.genre === "Comedy" ||
                movie.genre === "Kids" ||
                movie.genre === "Horror"
        )
        .forEach((movie) => {
            heartList.innerHTML += `<a href="video_detail.html?id=${movie.id}"><img class="movie" src="${movie.image}"/></a>`;
        });

    movies
        .filter(
            (movie) =>
                movie.genre === "Action" ||
                movie.genre === "Comedy" ||
                movie.genre === "Kids" ||
                movie.genre === "Horror"
        )
        .forEach((movie) => {
            forYou.innerHTML += `<a href="video_detail.html?id=${movie.id}"><img class="movie" src="${movie.image}"/></a>`;
        });
}
fetchMovies();
