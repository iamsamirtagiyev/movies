//!---------------->DOM<----------------

const profileImg = document.querySelector('.image img')
const fullname = document.querySelector('.fullname')
const username = document.querySelector('.username')
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

//!---------------->Functions<----------------

if(localStorage.getItem('user') == null){
    window.location = './signup.html'
}

profileImg.src = JSON.parse(localStorage.getItem('user')).image
fullname.innerHTML = JSON.parse(localStorage.getItem('user')).fullname
username.innerHTML = `@${JSON.parse(localStorage.getItem('user')).username}`

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

const logout = () => {
    localStorage.removeItem('user')
    window.location = './signup.html'
}

const openModal = () => {
    modalWrapper.classList.add('active')
    modal.classList.add('active')
    let userId = JSON.parse(localStorage.getItem('user')).id

    axios.get(`https://movies-gnnl.onrender.com/users/${userId}`).then(response => {
        const { image, username, email } = response.data

        imageLabel.src = image
        emailInput.value = email
        usernameInput.value = username
    })
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
        axios.patch(`https://movies-gnnl.onrender.com/users/${userId}`, obj).then((response) => {
            localStorage.removeItem('user')
            localStorage.setItem('user', JSON.stringify(response.data))
            window.location = './account.html'
        })
    }
}

//!---------------->Events<----------------

historyBtn.addEventListener('click', toHistory)
favoritesBtn.addEventListener('click', toFavorites)
watchList.addEventListener('scroll', isScroll)
logoutBtn.addEventListener('click', logout)
editBtn.addEventListener('click', openModal)
modalWrapper.addEventListener('click', closeModal)
img.addEventListener('change', showImg)
saveBtn.addEventListener('click', edit)
