//!---------------------> DOM <---------------------

const movieItem = document.querySelectorAll('.movie-item')

//!---------------------> Events <---------------------

movieItem.forEach(item => {
    const child = item.querySelector('.image').children

    child[1].addEventListener('click', () => {
        child[1].classList.toggle('active')
        child[2].classList.toggle('active')
        child[3].classList.toggle('active')
    })
})