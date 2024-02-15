let url = 'http://localhost:3000/'

const tbody = document.querySelector('tbody')

fetch(`${url}comments`).then(response => response.json()).then(data => {
    data.forEach(item => {
        tbody.innerHTML += `
        <tr>
                <td><img src=${item.user_image} alt="image"></td>
                <td>@${item.user_name}</td>
                <td><p>${item.comment}</p></td>
                <td>
                  <button class="delete-btn" title="delete" onclick="delCom(${item.id})"><i class="bi bi-trash3"></i></button>
                </td>
              </tr>
        `
    });
})

const delCom = (id) => {
  axios.delete(`${url}comments/${id}`).then(() => window.location.reload())
}