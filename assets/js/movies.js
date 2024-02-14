//!---------------------> DOM <---------------------

const nextBtn = document.querySelector('.right')
const prevBtn = document.querySelector('.left')
const genreSlider = document.querySelector('.genre-slider')
const movieList = document.querySelector('.movie-list')
const loadBtn = document.querySelector('.load-more button')
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
        genreSlider.innerHTML += `<span>${genre.name}</span>`
    })
})



//!---------------------> Functions <---------------------

const toDetails = (id) => {
    if (!event.target.classList.contains('favorite')) {
        window.location = `./detail.html?id=${id}`
    }
}

const showMovies = (page) => {
    fetch(`${baseUrl}discover/movie?api_key=${apiKey}&page=${page}`).then(response => response.json()).then(data => {
        data.results.forEach(res => {
            let imdbScore = `${res.vote_average}`
            movieList.innerHTML += `
            <div class="movie-item" id="${res.id}" onclick="toDetails(${res.id})">
            <div class="image" title=${res.title}>
                <img src="https://image.tmdb.org/t/p/w1280${res.poster_path}" alt=${res.title}>
                <div class="favorite" title="favorite" onclick=addFavorite(${res.id})>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                      </svg>
                </div>
            </div>
            <div class="desc">
                <span>${res.title}</span>
                <div>
                    <div class="imdb">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg>
                        <span>${imdbScore.slice(0, 3)}</span>
                    </div>
                    <div class="year">${res.release_date.split('-')[0]}</div>
                </div>
            </div>
        </div>
            `
            loader.style.display = 'none'
        })
    })
}

const check = () => {
    if (localStorage.getItem('favorites') == null) {
        fav = []
    }
    else {
        fav = JSON.parse(localStorage.getItem('favorites'))
    }
}

const addFavorite = (id) => {
    if (localStorage.getItem('user') == null) {
        window.location = './signup.html'
    }
    else {
        let icon = event.target

        if (icon.classList.contains('active')) {
            axios.get(`${url}favorites`).then(response => {
                let deleteId = response.data.find(del => del.movie_id == id)
                axios.delete(`${url}favorites/${deleteId.id}`).then(() => {
                    icon.classList.remove('active')
                    icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
              </svg>`
                    check()
                    fav.forEach((del, index) => {
                        if (del == id) {
                            fav.splice(index, 1)
                        }
                    })
                    localStorage.setItem('favorites', JSON.stringify(fav))
                })

            })
        }
        else {

            axios.post(`${url}favorites`, {
                user_id: JSON.parse(localStorage.getItem('user')).id,
                movie_id: id
            }).then(() => {
                icon.classList.add('active')
                icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
              </svg>`
                check()
                fav.push(id)
                localStorage.setItem('favorites', JSON.stringify(fav))
            })
        }
    }
}

showMovies(page)

//!---------------------> Events <---------------------


nextBtn.addEventListener('click', () => {
    genreSlider.scrollLeft += 500
})
prevBtn.addEventListener('click', () => {
    genreSlider.scrollLeft -= 500
})

loadBtn.addEventListener('click', () => {
    loader.style.display = 'block'
    page++
    showMovies(page)
})