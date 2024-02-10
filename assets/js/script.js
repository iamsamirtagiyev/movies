//!---------------------> DOM <---------------------

const movieList = document.querySelectorAll('.movie-list')
const nextBtns = document.querySelectorAll('.next')
const prevBtns = document.querySelectorAll('.prev')
const movies = document.querySelectorAll('.movie')



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