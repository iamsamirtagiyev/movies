//!---------------------> DOM <---------------------

const movieList = document.querySelectorAll('.movie-list')
const nextBtns = document.querySelectorAll('.next')
const prevBtns = document.querySelectorAll('.prev')
const movies = document.querySelectorAll('.movie')
const carousel = document.querySelectorAll('.carousel')

//!---------------------> Variables <---------------------

const apiKey = '42307d83029282167962d48513375d5e'
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500'



// fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`)
//     .then(response => response.json())
//     .then(response => {
//         response.results.forEach(element => {
//             carousel.innerHTML += `
//       <img src="https://image.tmdb.org/t/p/w500${element.backdrop_path}" alt="">`
//         });
// })

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

movieList.forEach(movie => {
    movie.addEventListener('click', () => {
        window.location = './detail.html'
    })
})