//!---------------------> DOM <---------------------

const movieList = document.querySelectorAll('.movie-list')
const nextBtns = document.querySelectorAll('.next')
const prevBtns = document.querySelectorAll('.prev')



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