//!---------------------> DOM <---------------------

const nextBtn = document.querySelector('.right')
const prevBtn = document.querySelector('.left')
const genreSlider = document.querySelector('.genre-slider')
const movieList = document.querySelector('.movie-list')
const loadBtnAll = document.querySelector('.all')
const loader = document.querySelector('.loader')

//!---------------------> Variables <---------------------

const apiKey = '42307d83029282167962d48513375d5e'
const baseUrl = 'https://api.themoviedb.org/3/'
const url = 'http://localhost:3000/'
let page = 1
let fav = []

//!---------------------> Fetch <---------------------

fetch(`${baseUrl}/genre/movie/list?api_key=${apiKey}`).then(response => response.json()).then(data => {
    data.genres.forEach(genre => {
        genreSlider.innerHTML += `<span onclick="withGenre(${genre.id}, ${page})">${genre.name}</span>`
    })
})



//!---------------------> Functions <---------------------


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

const getMovies = (id, title, poster_path, vote_average, release_date) => {
    let imdbScore = `${vote_average}`
    movieList.innerHTML += `
            <div class="movie-item" id="${id}" onclick="toDetails(${id})">
            <div class="image" title=${title}>
                <img src="https://image.tmdb.org/t/p/w1280${poster_path}" alt=${title}>
            </div>
            <div class="desc">
                <span>${title}</span>
                <div>
                    <div class="imdb">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg>
                        <span>${imdbScore.slice(0, 3)}</span>
                    </div>
                    <div class="year">${release_date.split('-')[0]}</div>
                </div>
            </div>
        </div>
            `
}

const showMovies = (page) => {
    fetch(`${baseUrl}discover/movie?api_key=${apiKey}&page=${page}`).then(response => response.json()).then(data => {
        data.results.forEach(res => {
            getMovies(res.id, res.title, res.poster_path, res.vote_average, res.release_date)
            loader.style.display = 'none'
        })
    })
}



showMovies(page)

const withGenre = (id, page) => {
    loadBtnAll.style.display = 'none'
    movieList.innerHTML = ''
    axios.get(`${baseUrl}/discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=en-US&page=&${page}&sort_by=popularity.desc&with_genres=${id}`).then(response => {
        response.data.results.forEach(data => {
            getMovies(data.id, data.title, data.poster_path, data.vote_average, data.release_date)
            loader.style.display = 'none'

        })
    })
}

//!---------------------> Events <---------------------


nextBtn.addEventListener('click', () => {
    genreSlider.scrollLeft += 500
})
prevBtn.addEventListener('click', () => {
    genreSlider.scrollLeft -= 500
})

loadBtnAll.addEventListener('click', () => {
    loader.style.display = 'block'
    page++
    showMovies(page)
})
