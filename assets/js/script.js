//!---------------------> DOM <---------------------

const movieList = document.querySelectorAll('.movie-list')
const nextBtns = document.querySelectorAll('.next')
const prevBtns = document.querySelectorAll('.prev')
const movies = document.querySelectorAll('.movie')
const carousel = document.querySelectorAll('.carousel')
const uncomingMovies = document.querySelector('.uncoming')
const trendingMovies = document.querySelector('.trending')
const topRatedMovies = document.querySelector('.top-rated')

//!---------------------> Variables <---------------------

const apiKey = '42307d83029282167962d48513375d5e'

//!---------------------> Functions <---------------------

const showMovies = (list, image, title, date, imdb) => {
    list.querySelector('.movie-list').innerHTML += `
        
        <div class="movie"  title="${title}">
        <div class="favorite" title="favorite">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
              </svg>
        </div>
        <div class="movie-image">
            <div class="overlay">
                <div class="left">
                    <span class="name">${title}</span>
                    <div class="imdb">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg>
                        <span>${imdb}</span>
                    </div>
                    <div class="year">${date.split('-')[0]}</div>
                </div>
                <div class="right">
                    <div class="favorite" title="favorite">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                          </svg>
                    </div>
                </div>
            </div>
            <img src="https://image.tmdb.org/t/p/w1280${image}" alt="${title}">
        </div>
        <div class="movie-info">
            <span>${title}</span>
            <div class="short-info">
                <div class="imdb">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>
                    <span>${imdb}</span>
                </div>
            </div>
        </div>
    </div>
        
        `
}

const toDetails = (id) => {
    window.location = `./detail.html?id=${id}`
}

//!---------------------> Fetch <---------------------

fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`)
.then(response => response.json())
.then(data => {
    console.log(data.results);
    data.results.forEach(movie => {
        const { backdrop_path, title, release_date, vote_average } = movie
        showMovies(uncomingMovies, backdrop_path, title, release_date, vote_average)
    })
})

fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=2`)
.then(response => response.json())
.then(data => {
    console.log(data.results);
    data.results.forEach(movie => {
        const { backdrop_path, title, release_date, vote_average } = movie
        showMovies(trendingMovies, backdrop_path, title, release_date, vote_average)
    })
})

fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=2`)
.then(response => response.json())
.then(data => {
    console.log(data.results);
    data.results.forEach(movie => {
        const { backdrop_path, title, release_date, vote_average } = movie
        showMovies(topRatedMovies, backdrop_path, title, release_date, vote_average)
    })
})

//!---------------------> Events <---------------------

nextBtns.forEach((nextBtn, index) => {
    nextBtn.addEventListener('click', () => {
        movieList[index].scrollLeft += 100
    })
})

prevBtns.forEach((prevBtn, index) => {
    prevBtn.addEventListener('click', () => {
        movieList[index].scrollLeft -= 100
    })
})