// ----------------------> DOM <----------------------

const form = document.querySelector('form')
const firstName = document.querySelector('.first-name')
const lastName = document.querySelector('.last-name')
const username = document.querySelector('.username')
const email = document.querySelector('.email')
const password = document.querySelector('.password')
const repeatPassword = document.querySelector('.repeat-password')
const signupBtn = form.querySelector('button')

// ----------------------> Functions <----------------------

const check = (e) => {
    const regex = /[^0-9]/g
    const checkIcon = document.querySelector('#check')
    console.log(regex.test(e.target.value));
    if(regex.test(e.target.value)){
        checkIcon.classList.add('bi-check-circle-fill')
        checkIcon.classList.remove('bi-x-circle-fill')
    }
    else{
        checkIcon.classList.remove('bi-check-circle-fill')
        checkIcon.classList.add('bi-x-circle-fill')
    }
}

// ----------------------> Events <----------------------

firstName.addEventListener('input', check)