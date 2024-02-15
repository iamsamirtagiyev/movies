//!---------------------> DOM <---------------------

const body = document.querySelector("body");
const nav = document.querySelector("nav");
const menuIcon = document.querySelector(".menu-icon");
const menu = document.querySelector(".menu");
const overlay = document.querySelector(".overlay");
const sidebar = document.querySelector("aside");
const searchIcon = document.querySelector(".search-icon");
const closeIcon = document.querySelector(".close-icon");
const searchBox = document.querySelector(".search-box");
const accountBtn = document.querySelector(".account");
const banner = document.querySelector(".banner");
const list = document.querySelectorAll(".list");
const searchModal = document.querySelector('.search-modal')
const searchInput = document.querySelector('.search input')
const searchTitle = searchModal.querySelector('.search-title')
const resultWrapper = searchModal.querySelector('.result-wrapper')

// const apiKey = '42307d83029282167962d48513375d5e'
// const baseUrl = 'https://api.themoviedb.org/3/'

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
    searchInput.focus()
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
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
        </svg>
    <span>Sign Up</span>
    `;
  } else {
    accountBtn.classList.add('active')
    accountBtn.innerHTML = `
    <span>${JSON.parse(localStorage.getItem("user")).fullname}</span>
        `;
  }
};

fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=42307d83029282167962d48513375d5e`).then(response => response.json()).then(data => {
  data.genres.forEach(genre => {
      menu.innerHTML += `<li onclick="toMovies(${genre.id})">${genre.name}</li>`
  })
})


const toMovies = (id) => {
  window.location = `films.html?id=${id}`
}

const searchMovie = () => {
  if(searchInput.value.trim()){
    resultWrapper.innerHTML = ''
    searchBox.classList.add('load')
      searchModal.style.display = 'flex'
      searchTitle.innerHTML = searchInput.value.trim()
      fetch(`https://api.themoviedb.org/3/search/movie?query=${searchInput.value.trim()}&api_key=42307d83029282167962d48513375d5e`).then(response => response.json()).then(data => {
        data.results.forEach(result => {
          let score = `${result.vote_average}`
          resultWrapper.innerHTML += `
        <div class="movie-item" onclick="goDetail(${result.id})">
                    <div class="image" title=${result.title}>
                        <img src="https://image.tmdb.org/t/p/w1280${result.poster_path}" alt=${result.title}>
                    </div>
                    <div class="desc">
                        <span>${result.title}</span>
                        <div>
                            <div class="imdb">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg>
                                <span>${score.slice(0, 3)}</span>
                            </div>
                            <div class="year">${result.release_date.split('-')[0]}</div>
                        </div>
                    </div>
                </div>
        `
        searchBox.classList.remove('load')
        })
      })
  }
  else{
      searchModal.style.display = 'none'
  }
}

const goDetail = (id) => {
  if(localStorage.getItem('user') != null){
    axios.post(`${url}history`, {
        user_id: JSON.parse(localStorage.getItem('user')).id,
        movie_id: id
    }).then(()=> window.location = `./detail.html?id=${id}`)
}
else{
    window.location = `./detail.html?id=${id}`
}
}

//!---------------------> Events <---------------------

menuIcon.addEventListener("click", toggleMenu);
overlay.addEventListener("click", toggleMenu);
searchIcon.addEventListener("click", toggleSearchBox);
closeIcon.addEventListener("click", toggleSearchBox);
accountBtn.addEventListener("click", toAccount);
window.addEventListener("DOMContentLoaded", account);
searchInput.addEventListener('input', searchMovie)
