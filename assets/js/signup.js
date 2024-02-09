//!----------------------> DOM <----------------------

const form = document.querySelector('form')
const firstName = document.querySelector('.first-name')
const lastName = document.querySelector('.last-name')
const username = document.querySelector('.username')
const email = document.querySelector('.email')
const password = document.querySelector('.password')
const repeatPassword = document.querySelector('.repeat-password')
const signupBtn = form.querySelector('button')
const eyeIcon = document.querySelectorAll('.eye')

//!----------------------> Variables <----------------------

let user = {}
let isFirstName = false
let isLastName = false
let isUser = false
let isEmail = false
let isPassword = false

//!----------------------> Functions <----------------------

const showToast = (type, message) => {
    const toast = document.querySelector(`.${type}`)
    const icon = toast.querySelector('i')
    type == 'success' ? icon.classList.add('bi-check') : icon.classList.add('bi-x')
    toast.querySelector('span').innerHTML = message

    toast.classList.add('active')
    setTimeout(() => { toast.classList.remove('active') }, 3000)
}

const checkFirstName = (e) => {
    const regex = /^[a-z]+$/i
    const checkIcon = e.target.parentElement.querySelector('#check')

    if(regex.test(e.target.value)){
        checkIcon.classList.add('bi-check-circle-fill')
        checkIcon.classList.remove('bi-x-circle-fill')
        return isFirstName = true
    }
    else{
        checkIcon.classList.add('bi-x-circle-fill')
        checkIcon.classList.remove('bi-check-circle-fill')
        return isFirstName = false
    }
}
const checkLastName = (e) => {
    const regex = /^[a-z]+$/i
    const checkIcon = e.target.parentElement.querySelector('#check')

    if(regex.test(e.target.value)){
        checkIcon.classList.add('bi-check-circle-fill')
        checkIcon.classList.remove('bi-x-circle-fill')
        return isLastName = true
    }
    else{
        checkIcon.classList.add('bi-x-circle-fill')
        checkIcon.classList.remove('bi-check-circle-fill')
        return isLastName = false
    }
}

const checkUsername = (e) => {
    const regex = /^[a-z0-9_\.]+$/g
    const checkIcon = e.target.parentElement.querySelector('#check')

    if(regex.test(e.target.value)){
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

const checkEmail = (e) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g
    const checkIcon = e.target.parentElement.querySelector('#check')

    if(regex.test(e.target.value)){
        checkIcon.classList.add('bi-check-circle-fill')
        checkIcon.classList.remove('bi-x-circle-fill')
        return isEmail = true
    }
    else{
        checkIcon.classList.add('bi-x-circle-fill')
        checkIcon.classList.remove('bi-check-circle-fill')
        return isEmail = false
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

const createUser = (e) => {
    e.preventDefault()

    if(!isFirstName){
        showToast('error', 'Name and surname must consist of letters only')
    }
    else if(!isLastName){
        showToast('error', 'Name and surname must consist of letters only')
    }
    else if(!isUser){
        showToast('error', 'In username . and no characters other than _ can be used')
    }
    else if(!isEmail){
        showToast('error', 'Wrong email')
    }
    else if(!isPassword){
        showToast('error', 'Password must be more than 6 characters')
    }
    else if(password.value != repeatPassword.value){
        showToast('error', 'Passwords are not the same')
    }
    else{
        user = {
            fullname: `${firstName.value} ${lastName.value}`,
            username: username.value,
            email: email.value,
            password: password.value,
            image: './assets/images/user.png'
        }
        axios.post('http://localhost:3000/user', user).then(response => {
            localStorage.setItem('user', JSON.stringify(user))
            window.location = './index.html'
        }) 
        
    }
}


//!----------------------> Events <----------------------

firstName.addEventListener('input', checkFirstName)
lastName.addEventListener('input', checkLastName)
username.addEventListener('input', checkUsername)
email.addEventListener('input', checkEmail)
password.addEventListener('input', checkPassword)
repeatPassword.addEventListener('input', checkPassword)
eyeIcon.forEach(eye => {
    eye.addEventListener('click', showHide)
})
form.addEventListener('submit', createUser)
