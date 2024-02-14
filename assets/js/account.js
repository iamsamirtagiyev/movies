//!---------------->DOM<----------------

const profileImg = document.querySelector('.image img')
const fullname = document.querySelector('.fullname')
const usernameSpan = document.querySelector('.username-span')
const favoritesBtn = document.querySelector('.favorites')
const historyBtn = document.querySelector('.history')
const historyContainer = document.querySelector('.history-container')
const favoritesContainer = document.querySelector('.favorites-container')
const watchList = document.querySelector('.watchlist')
const buttons = document.querySelector('.buttons')
const logoutBtn = document.querySelector('.logout-btn')
const editBtn = document.querySelector('.edit-btn')
const modalWrapper = document.querySelector('.modal-wrapper')
const modal = document.querySelector('.modal')
const usernameInput = modal.querySelector('.username')
const emailInput = modal.querySelector('.email')
const img = modal.querySelector('#img')
const imageLabel = modal.querySelector('label img')
const saveBtn = modal.querySelector('button')

//!---------------->Variables<----------------

let url = 'http://localhost:3000/'
const apiKey = '42307d83029282167962d48513375d5e'
const baseUrl = 'https://api.themoviedb.org/3/'

//!---------------->Axios<----------------



//!---------------->Functions<----------------

if(localStorage.getItem('user') == null){
    window.location = './signup.html'
}

profileImg.src = JSON.parse(localStorage.getItem('user')).image
fullname.innerHTML = JSON.parse(localStorage.getItem('user')).fullname
usernameSpan.innerHTML = `@${JSON.parse(localStorage.getItem('user')).username}`

const showToast = (type, message) => {
    const toast = document.querySelector(`.${type}`);
    const icon = toast.querySelector("i");
    type == "success"
      ? icon.classList.add("bi-check")
      : icon.classList.add("bi-x");
    toast.querySelector("span").innerHTML = message;
  
    toast.classList.add("active");
    setTimeout(() => {
      toast.classList.remove("active");
    }, 3000);
};

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

const logout = () => {
    localStorage.removeItem('user')
    window.location = './signup.html'
}

const openModal = () => {
    modalWrapper.classList.add('active')
    modal.classList.add('active')
    let userId = JSON.parse(localStorage.getItem('user')).id

    imageLabel.src = JSON.parse(localStorage.getItem('user')).image
    usernameInput.value = JSON.parse(localStorage.getItem('user')).username
    emailInput.value = JSON.parse(localStorage.getItem('user')).email
}

const closeModal = (e) => {
    if(e.target.classList.contains('modal-wrapper')){
        modalWrapper.classList.remove('active')
        modal.classList.remove('active')
    }
}

const showImg = () => {
    let reader = new FileReader()
    reader.readAsDataURL(img.files[0])
    reader.onload = (e) => {
        imageLabel.src = e.target.result
    }
}

const edit = (e) => {
    e.preventDefault()

    if(usernameInput.value == '' || emailInput.value == ''){
        showToast('error', 'Please fill in this field')
    }
    else{
        let userId = JSON.parse(localStorage.getItem('user')).id
        let obj = {
            image: imageLabel.src,
            username: usernameInput.value,
            email: emailInput.value
        }
        console.log(obj);
        axios.patch(`${url}users${userId}`, obj).then((response) => {
            localStorage.removeItem('user')
            localStorage.setItem('user', JSON.stringify(response.data))
            window.location = './account.html'
        })
    }
}

//!---------------->Events<----------------

historyBtn.addEventListener('click', toHistory)
favoritesBtn.addEventListener('click', toFavorites)
logoutBtn.addEventListener('click', logout)
editBtn.addEventListener('click', openModal)
modalWrapper.addEventListener('click', closeModal)
img.addEventListener('change', showImg)
saveBtn.addEventListener('click', edit)
