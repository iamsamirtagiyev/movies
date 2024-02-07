//!---------------------> DOM <---------------------

const menuIcon = document.querySelector('.menu-icon')
const overlay = document.querySelector('.overlay')
const sidebar = document.querySelector('aside')

//!---------------------> Functions <---------------------

const toggleMenu = () => { 
    sidebar.classList.toggle('active')
    overlay.classList.toggle('active')
    menuIcon.classList.toggle('active')
}


//!---------------------> Events <---------------------

menuIcon.addEventListener('click', toggleMenu)
overlay.addEventListener('click', toggleMenu)
