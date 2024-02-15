//!---------------->DOM<----------------

const profileImg = document.querySelector('.image img')
const fullname = document.querySelector('.fullname')
const usernameSpan = document.querySelector('.username-span')
const historyContainer = document.querySelector('.history-container')
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
let fav = []

//!---------------->Axios<----------------

axios.get(`${url}history`).then(response => {
    response.data.forEach(element => {
        axios.get(`${baseUrl}/movie/${element.movie_id}?api_key=${apiKey}&language=en-US`).then(res => {
            getMovies(historyContainer, res.data.id, res.data.poster_path, res.data.title)
        })
    });
})

//!---------------->Functions<----------------

const getMovies = (list, id, poster, name) => {
    list.innerHTML += `
    <div class="movie-item" onclick="toDetails(${id})">
                <div class="cover">
                  <img src="https://image.tmdb.org/t/p/w1280${poster}" alt="cover" />
                </div>
                <div class="movie-detail">
                  <div class="desc">
                    <span class="movie-name">${name}</span>
                  </div>
                  <button class="remove" onclick="removeFromData(${id})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-x"
                      viewBox="0 0 16 16">
                      <path
                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                    </svg><span>Remove Favorites</span>
                  </button>
                </div>
              </div>
    `
}

const removeFromData = (id) => {
    axios.get(`${url}history`).then(response => {
        let delId = response.data.find(s => s.movie_id = id).id
        axios.delete(`${url}history/${delId}`).then(() => window.location.reload())
    })
}

const toDetails = (id) => {
    if(!event.target.classList.contains('remove')){
        window.location = `./detail.html?id=${id}`
    }
}

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
logoutBtn.addEventListener('click', logout)
editBtn.addEventListener('click', openModal)
modalWrapper.addEventListener('click', closeModal)
img.addEventListener('change', showImg)
saveBtn.addEventListener('click', edit)
