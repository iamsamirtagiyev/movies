//!---------------------> DOM <---------------------

const menuIcon = document.querySelector('.menu-icon')
const overlay = document.querySelector('.overlay')
const sidebar = document.querySelector('aside')
const logoutBtn = document.querySelector('.logout')

//!---------------------> Functions <---------------------

const toggleMenu = () => { 
    sidebar.classList.toggle('active')
    overlay.classList.toggle('active')
    menuIcon.classList.toggle('active')
}

const logout = () => {
    window.location = '../signup.html'
}


//!---------------------> Events <---------------------

menuIcon.addEventListener('click', toggleMenu)
overlay.addEventListener('click', toggleMenu)
logoutBtn.addEventListener('click', logout)
