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
const baseUrl = 'https://api.themoviedb.org/3/movie/'
let url = 'http://localhost:3000/'
const fav = []

//!---------------------> Functions <---------------------

const showMovies = (list, image, title, date, imdb, id) => {
    let imdbs = `${imdb}`
    list.querySelector('.movie-list').innerHTML += `
        
        <div class="movie"  title="${title}" onclick="toDetails(${id})">
        <div class="movie-image">
            <div class="overlay">
                <div class="left">
                    <span class="name">${title}</span>
                    <div class="imdb">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg>
                        <span>${imdbs.slice(0, 3)}</span>
                    </div>
                    <div class="year">${date.split('-')[0]}</div>
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
    if(localStorage.getItem('user') != null){
        axios.post(`${url}history`, {
            user_id: JSON.parse(localStorage.getItem('user')).id,
            movie_id: id
        }).then(()=> window.location = `./detail.html?id=${id}`)
    }
    else{
        window.location = `./detail.html?id=${id}`
    }
}



//!---------------------> Fetch <---------------------

fetch(`${baseUrl}upcoming?api_key=${apiKey}&language=en-US&page=2`)
.then(response => response.json())
.then(data => {
    data.results.forEach(movie => {
        const { poster_path, title, release_date, vote_average, id } = movie
        showMovies(uncomingMovies, poster_path, title, release_date, vote_average, id)
    })
})

fetch(`${baseUrl}now_playing?api_key=${apiKey}&language=en-US&page=2`)
.then(response => response.json())
.then(data => {
    data.results.forEach(movie => {
        const { poster_path, title, release_date, vote_average, id } = movie
        showMovies(trendingMovies, poster_path, title, release_date, vote_average, id)
    })
})

fetch(`${baseUrl}top_rated?api_key=${apiKey}&language=en-US&page=1`)
.then(response => response.json())
.then(data => {
    data.results.forEach(movie => {
        const { poster_path, title, release_date, vote_average, id } = movie
        showMovies(topRatedMovies, poster_path, title, release_date, vote_average, id)
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

