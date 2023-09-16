const movieDetail = document.querySelector(".movieDetail");

async function getMovieDetail() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const movieId = urlParams.get("id");
    const response = await fetch("https://api.noroff.dev/api/v1/square-eyes");
    const movies = await response.json();
    const movie = movies.filter((movie) => movie.id === movieId)[0];

    console.log(movie);
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
            <h1>${movie.title}</h1>
            <p>${movie.description}</p>
            <div class="price">$ 17.99</div>
            <div class="heart-purchase">
                <a href="#" aria-label="orange heart icon/liked list">
                    <i class="fa fa-heart-o fa-lg" aria-hidden="true"></i>
                </a>
                <a class="button" href="video_detail_checked.html" aria-label="Add to cart">
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
                <img src="images/Trailer.png" alt="Elvis: a dark haired man and woman looking as if they are about to kiss.">
                <img src="images/Play.png" class="img-top" alt="Elvis: a dark haired man and woman looking as if they are about to kiss with a play icon on top of the image.">
            </div>
        </div>
    </div>
    `;
}
getMovieDetail();