//!---------------------> DOM <---------------------

const addBtn = document.querySelector('.add-btn')
const comment = document.querySelector('.add-comment textarea')

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
    if(localStorage.getItem('user') == null){
        window.location = './signup.html'
    }
    else if(comment.value == ''){
        showToast('error', 'Write a comment')
    }
}

//!---------------------> Events <---------------------

addBtn.addEventListener('click', addComment)