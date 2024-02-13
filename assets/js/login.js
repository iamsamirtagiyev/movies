//!----------------------> DOM <----------------------

const form = document.querySelector('form')
const usernameOrEmail = document.querySelector('.username-or-email')
const password = document.querySelector('.password')
const loginBtn = form.querySelector('button')
const eyeIcon = document.querySelectorAll('.eye')

//!----------------------> Variables <----------------------

let isUser = false
let isPassword = false
let url = 'https://movies-gnnl.onrender.com/'

//!----------------------> Functions <----------------------

if(localStorage.getItem('user')){
    window.location = './index.html'
}

const showToast = (type, message) => {
    const toast = document.querySelector(`.${type}`)
    const icon = toast.querySelector('i')
    type == 'success' ? icon.classList.add('bi-check') : icon.classList.add('bi-x')
    toast.querySelector('span').innerHTML = message

    toast.classList.add('active')
    setTimeout(() => { toast.classList.remove('active') }, 3000)
}


const checkUsernameOrEmail = (e) => {
    const regexUsername = /^[a-z0-9_\.]+$/g
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g
    const checkIcon = e.target.parentElement.querySelector('#check')

    if(regexUsername.test(e.target.value) || regexEmail.test(e.target.value)){
        checkIcon.classList.add('bi-check-circle-fill')
        checkIcon.classList.remove('bi-x-circle-fill')
        return isUser = true
    }
    else{
        checkIcon.classList.add('bi-x-circle-fill')
        checkIcon.classList.remove('bi-check-circle-fill')
        return isUser = false
    }
}

const checkPassword = (e) => {
    const checkIcon = e.target.parentElement.querySelector('#check')

    if(e.target.value.length > 6){
        checkIcon.classList.add('bi-check-circle-fill')
        checkIcon.classList.remove('bi-x-circle-fill')
        return isPassword = true
    }
    else{
        checkIcon.classList.add('bi-x-circle-fill')
        checkIcon.classList.remove('bi-check-circle-fill')
        return isPassword = false
    }
}

const showHide = (e) => {
    const input = e.target.parentElement.querySelector('input')

    if(input.type == 'password'){
        input.type = 'text'
        e.target.classList.replace('bi-eye-slash', 'bi-eye')
    }
    else{
        input.type = 'password'
        e.target.classList.replace('bi-eye', 'bi-eye-slash')
    }
}

const loginUser = (e) => {
    e.preventDefault()

    if(password.value == 'admin123' && usernameOrEmail.value == 'admin'){
        window.location = './admin/admin.html'
    }

    axios.get(`${url}users`).then(response => {
        const isUser = response.data.find(user => {
            if(user.username == usernameOrEmail.value || user.email == usernameOrEmail.value){
                return user
            }
        })
        
        if(!isUser){
            showToast('error', 'User not found')
        }
        else{
            if(isUser.password != password.value){
                showToast('error', 'Wrong password')
            }
            else{
                localStorage.setItem('user', JSON.stringify(isUser))
                window.location = './account.html'
            }
        }
    })
}


//!----------------------> Events <----------------------

usernameOrEmail.addEventListener('input', checkUsernameOrEmail)
password.addEventListener('input', checkPassword)
eyeIcon.forEach(eye => {
    eye.addEventListener('click', showHide)
})
form.addEventListener('submit', loginUser)
