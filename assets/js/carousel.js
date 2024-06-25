
$(document).ready(() => {
  $('.carousel').carousel()

  const carouselItems = document.querySelectorAll('.carousel-item')
  const bannerWrapper = document.querySelector('.banner-wrapper')
  const description = document.querySelector('.description')

  $.get(`https://api.themoviedb.org/3/movie/popular?api_key=4b8f4e8e3501bad806af6cda70c0071a&language=en-US`, (data) => {
    $.each(data.results, (index, value) => {
      carouselItems[index].querySelector('img').src = `https://image.tmdb.org/t/p/w1280${value.poster_path}`
    })

    bannerWrapper.style.background = `linear-gradient(
      to right,
      rgba(0, 0, 0, 0.9),
      rgba(0, 0, 0, 0.4)
    ),url(https://image.tmdb.org/t/p/w1280${data.results[0].backdrop_path}) no-repeat center/cover`

    $.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=4b8f4e8e3501bad806af6cda70c0071a&language=en-US`, (genre => {

      gnr1 = genre.genres.find(gen => {
        if (gen.id == data.results[0].genre_ids[0]) {
          return gen
        }
      })
      gnr2 = genre.genres.find(gen => {
        if (gen.id == data.results[0].genre_ids[1]) {
          return gen
        }
      })
      gnr3 = genre.genres.find(gen => {
        if (gen.id == data.results[0].genre_ids[2]) {
          return gen
        }
      })
      // console.log(data.results[0]);
      let imdb = `${data.results[0].vote_average}`
      description.innerHTML = `
    
    <h1>${data.results[0].title}</h1>
    <span>${data.results[0].release_date.split('-')[0]} <p>${imdb.slice(0, 3)}</p></span>
    <span>${gnr1.name}, ${gnr2.name}, ${gnr3.name}</span>
    <p>${data.results[0].overview}</p>
    <a href="detail.html?id=${data.results[0].id}" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-play-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
        <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445"/>
      </svg>Watch Now</a>  

    `
    }))


    $.each(carouselItems, (index, item) => {
      item.onclick = () => {
        $.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=4b8f4e8e3501bad806af6cda70c0071a&language=en-US`, (genre => {

          gnr1 = genre.genres.find(gen => {
            if (gen.id == data.results[index].genre_ids[0]) {
              return gen
            }
          })
          gnr2 = genre.genres.find(gen => {
            if (gen.id == data.results[index].genre_ids[1]) {
              return gen
            }
          })

          let imdb = `${data.results[index].vote_average}`

          bannerWrapper.style.background = `linear-gradient(
            to right,
            rgba(0, 0, 0, 0.9),
            rgba(0, 0, 0, 0.4)
            ),url(https://image.tmdb.org/t/p/w1280${data.results[index].backdrop_path}) no-repeat center/cover`

          description.innerHTML = `
    
    <h1>${data.results[index].title}</h1>
    <span>${data.results[index].release_date.split('-')[0]} <p>${imdb.slice(0, 3)}</p></span>
    <span>${gnr1.name}, ${gnr2.name}</span>
    <p>${data.results[index].overview}</p>
    <a href="detail.html?id=${data.results[index].id}" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-play-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
        <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445"/>
      </svg>Watch Now</a>  

    `
        }))

      }
    })
  })
})
