let email = sessionStorage.getItem("email");
document.querySelector(".title").innerHTML = email;
let transactions = Array.from(JSON.parse(localStorage.getItem("transactions") || '[]'));

transactions = transactions.filter(item =>
    item.sender.toLowerCase().includes(email.toLowerCase()) ||
    item.reciever.toLowerCase().includes(email.toLowerCase())
);

window.addEventListener('DOMContentLoaded', loadTable);
search.addEventListener('input', filter);
let table = document.getElementById('tableId');

function loadTable() {
    let temp = "";

    transactions.forEach(row => {
        temp += `
        <tr>
          <td>${row.sender}</td>
          <td>${row.reciever}</td>
          <td>${row.amount}</td>
        </tr>
        `
    });

    table.innerHTML = temp;
}

function filter(e) {
    let results;
    let temp = "";

    results = transactions.filter(item =>
        item.sender.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.reciever.toLowerCase().includes(e.target.value.toLowerCase())
    );
    console.log(results)
    if (results.length > 0) {
        results.forEach(row => {
            temp += `
                <tr>
                    <td>${row.sender}</td>
                    <td>${row.reciever}</td>
                    <td>${row.amount}</td>
                </tr>
                `
        });
    }

    table.innerHTML = temp;
}

function logOut() {
    sessionStorage.clear();
    window.location.href = "../index.html";
    return false;
}