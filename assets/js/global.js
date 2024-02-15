//!---------------------> DOM <---------------------

const body = document.querySelector("body");
const nav = document.querySelector("nav");
const menuIcon = document.querySelector(".menu-icon");
const overlay = document.querySelector(".overlay");
const sidebar = document.querySelector("aside");
const searchIcon = document.querySelector(".search-icon");
const closeIcon = document.querySelector(".close-icon");
const searchBox = document.querySelector(".search-box");
const accountBtn = document.querySelector(".account");
const banner = document.querySelector(".banner");
const list = document.querySelectorAll(".list");

//!---------------------> Functions <---------------------

const toggleMenu = () => {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
  menuIcon.classList.toggle("active");
};

const toggleSearchBox = () => {
  if (searchBox.classList.contains("active")) {
    searchBox.classList.remove("active");
  } else {
    searchBox.classList.add("active");
  }
};



const toAccount = () => {
  if (localStorage.getItem("user") == null) {
    window.location = "./signup.html";
  } else {
    window.location = "./account.html";
  }
};

const account = () => {
  if (localStorage.getItem("user") == null) {
    accountBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
        </svg>
    <span>Sign Up</span>
    `;
  } else {
    accountBtn.innerHTML = `
        <img width='25' height='25' src=${
          JSON.parse(localStorage.getItem("user")).image
        } alt='user'/>
        <span>${JSON.parse(localStorage.getItem("user")).fullname}</span>
        `;
  }
};

//!---------------------> Events <---------------------

menuIcon.addEventListener("click", toggleMenu);
overlay.addEventListener("click", toggleMenu);
searchIcon.addEventListener("click", toggleSearchBox);
closeIcon.addEventListener("click", toggleSearchBox);
accountBtn.addEventListener("click", toAccount);
window.addEventListener("DOMContentLoaded", account);
