//!---------------------> DOM <---------------------

const menuIcon = document.querySelector('.menu-icon')
const overlay = document.querySelector('.overlay')
const sidebar = document.querySelector('aside')
const searchIcon = document.querySelector('.search-icon')
const closeIcon = document.querySelector('.close-icon')
const searchBox = document.querySelector('.search-box')
const activeTheme = document.querySelector('.active-theme')
const themeOptions = document.querySelector('.theme-options')
const options = themeOptions.querySelectorAll('span')
const accountBtn = document.querySelector('.account')

//!---------------------> Functions <---------------------

const toggleMenu = () => { 
    sidebar.classList.toggle('active')
    overlay.classList.toggle('active')
    menuIcon.classList.toggle('active')
}

const toggleSearchBox = () => {
    if(searchBox.classList.contains('active')){
        searchBox.classList.remove('active')
    }
    else{
        searchBox.classList.add('active')
    }
}

const toggleTheme = () => {
    themeOptions.classList.toggle('active')
}

const selectTheme = (e) => {
    activeTheme.querySelector('span').innerHTML = e.target.innerHTML
}

const toAccount = () => {
    if(localStorage.getItem('users') == null){
        window.location = './signup.html'
    }
    else{
        window.location = './account.html'
    }
}

//!---------------------> Events <---------------------

menuIcon.addEventListener('click', toggleMenu)
overlay.addEventListener('click', toggleMenu)
searchIcon.addEventListener('click', toggleSearchBox)
closeIcon.addEventListener('click', toggleSearchBox)
activeTheme.addEventListener('click', toggleTheme)
options.forEach(option => {
    option.addEventListener('click', selectTheme)
})
accountBtn.addEventListener('click', toAccount)

