//!---------------------> DOM <---------------------

const addBtn = document.querySelector('.add-btn')
const comment = document.querySelector('.add-comment textarea')
const poster = document.querySelector('.poster')

//!---------------------> Variables <---------------------

let id = new URLSearchParams(window.location.search).get('id')
const apiKey = '42307d83029282167962d48513375d5e'
const baseUrl = 'https://api.themoviedb.org/3/'
const genre = []

//!---------------------> Axios <---------------------

axios.get(`${baseUrl}/movie/${id}?api_key=${apiKey}&language=en-US`).then(response => {
  const imdb = `${response.data.vote_average}`
  response.data.genres.forEach(gnr => {
    return genre.push(gnr.name)
  });
  poster.innerHTML = `
  
  <div class="poster-image">
  <img src="https://image.tmdb.org/t/p/w1280${response.data.backdrop_path}" alt="poster">
</div>
<div class="poster-desc">
  <h1>${response.data.title}</h1>
  <div class="imdb">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
      </svg>
      <span>${imdb.slice(0, 3)}</span>
      <span class="dot"></span>
      <span>${response.data.runtime}m</span>
  </div>
  <span class="genre">${genre.join(', ')}</span>
  <p>${response.data.overview}</p>
  <div class="actors">
      <span></span>
      <p></p>
  </div>
  <div class="directed">
      <span></span>
      <p></p>
  </div>
</div>

  `
})

axios.get(`${baseUrl}movie/${id}/videos?api_key=${apiKey}`).then(response => {
  response.data.results.forEach(video => {
    if(video.site == 'YouTube'){
      document.querySelector('.trailer-box').innerHTML += `
      
      <div class="trailer" style="background-image: url(./assets/images/video-bg-icon.png);">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/ZaTUatY-UoU?si=Jm2SPpSyYCoS4xhl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>
      
      `
    }
  })
})

//!---------------------> Functions <---------------------

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

const addComment = () => {
  if (localStorage.getItem('user') == null) {
    window.location = './signup.html'
  }
  else if (comment.value == '') {
    showToast('error', 'Write a comment')
  }
}

//!---------------------> Events <---------------------

addBtn.addEventListener('click', addComment)