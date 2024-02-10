//!---------------------> DOM <---------------------

const movieItem = document.querySelectorAll('.movie-item')
const nextBtn = document.querySelector('.right')
const prevBtn = document.querySelector('.left')
const genreSlider = document.querySelector('.genre-slider')

//!---------------------> Events <---------------------

movieItem.forEach(item => {
    const child = item.querySelector('.image').children

    child[1].addEventListener('click', () => {
        child[1].classList.toggle('active')
        child[2].classList.toggle('active')
        child[3].classList.toggle('active')
    })
})

nextBtn.addEventListener('click', () => {
    genreSlider.scrollLeft += 100
})
prevBtn.addEventListener('click', () => {
    genreSlider.scrollLeft -= 100
})

movieItem.forEach(movie => {
    movie.addEventListener('click', () => {
        window.location = './detail.html'
    })
})