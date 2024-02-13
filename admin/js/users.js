const tbody = document.querySelector('tbody')

axios.get(`https://movies-gnnl.onrender.com/users`).then(response => {
    response.data.forEach(user => {
        tbody.innerHTML += `
        <tr>
            <td>${user.id}</td>
            <td><img src=${user.image} alt="image"></td>
            <td>${user.fullname}</td>
            <td>@${user.username}</td>
            <td>
                <button class="delete-btn" onclick="deleteUser(${user.id})" title="delete"><i class="bi bi-trash3"></i></button>
            </td>
      </tr>
        `
    });
})

const deleteUser = (id) => {
    if (confirm('Do you want to delete this user?')) {
        axios.delete(`http://localhost:3000/user/${id}`).then(() => {
            localStorage.removeItem('user')
            window.location.reload()
        })
    }
}