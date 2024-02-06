$(document).ready(function () {
  $(".carousel").carousel();

  $interval = setInterval(() => {
    $(".carousel").carousel("next");
  }, 3000);
  
  $('.carousel').on('mouseover', () => {
    clearInterval($interval)
  }).on('mouseleave', () => {
    $interval = setInterval(() => {
      $(".carousel").carousel("next");
    }, 3000);
  });
  
});
