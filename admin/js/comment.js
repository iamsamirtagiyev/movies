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
                  <button class="detail-btn" title="detail"><i class="bi bi-info-circle"></i></button>
                  <button class="delete-btn" title="delete"><i class="bi bi-trash3"></i></button>
                </td>
              </tr>
        `
    });
})