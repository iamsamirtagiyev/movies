const profileImg = document.querySelector('.image img')
const fullname = document.querySelector('.fullname')
const username = document.querySelector('.username')
const favoritesBtn = document.querySelector('.favorites')
const historyBtn = document.querySelector('.history')
const historyContainer = document.querySelector('.history-container')
const favoritesContainer = document.querySelector('.favorites-container')
const watchList = document.querySelector('.watchlist')
const buttons = document.querySelector('.buttons')

profileImg.src = JSON.parse(localStorage.getItem('user')).image
fullname.innerHTML = JSON.parse(localStorage.getItem('user')).fullname
username.innerHTML = JSON.parse(localStorage.getItem('user')).username

const toHistory = () => {
    buttons.classList.add('right')
    buttons.classList.remove('left')
    watchList.scrollLeft += 2000
}
const toFavorites = () => {
    watchList.scrollLeft -= 2000
    buttons.classList.remove('right')
    buttons.classList.add('left')
}

const isScroll = () =>{
    if(watchList.scrollLeft > 500){
        buttons.classList.add('right')
        buttons.classList.remove('left')
    }
    else{
        buttons.classList.remove('right')
        buttons.classList.add('left')
    }
}


historyBtn.addEventListener('click', toHistory)
favoritesBtn.addEventListener('click', toFavorites)
watchList.addEventListener('scroll', isScroll)