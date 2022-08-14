let adminEmail = sessionStorage.getItem("email");
document.querySelector(".title").innerHTML = adminEmail;

let users = Array.from(JSON.parse(localStorage.getItem("users") || '[]'));

let search = document.getElementById('search');
let table = document.getElementById('tableId');

search.addEventListener('input', filter);

function filter(e) {
    let results;
    let temp = "";

    results = users.filter(item =>
        item.email.toLowerCase().includes(e.target.value.toLowerCase())
    );
    if (results.length > 0) {
        results.forEach((row, index) => {
            temp += `
                <tr>
                    <td>${row.email}</td>
                    <td>${row.balance}</td>
                    <td>
                    <input type="number" id="${index}" placeholder="enter amount">
                    <input type="submit" onclick="return deposit('${index}', '${row.email}')">
                    </td>
                <tr>
                `
        });
    }
    table.innerHTML = temp;
}
window.addEventListener('DOMContentLoaded', buildTable(users));

// buildTable(users);

function buildTable(data) {
    let table = document.getElementById('tableId');

    for (let i = 0; i < data.length; i++) {
        let balance = data[i].balance === undefined ? 0 : data[i].balance;

        let row = `<tr>
                        <td>${data[i].email}</td>
                        <td>${balance}</td>
                        <td>
                        <input type="number" id="${i}" placeholder="enter amount">
                        <input type="submit" onclick="return deposit('${i}', '${data[i].email}')">
                        </td>
                    <tr>`
        table.innerHTML += row;
    }
}

function logOut() {
    sessionStorage.clear();
    window.location.href = "index.html";
    return false;
}

function viewTransactions(){
    window.location.href = "transactions.html";
    return false;
}

function deposit(i, email) {
    let amount = 0;
    amount = document.getElementById(i).value;
    if (!amount) {
        alert('enter valid amount')
        return;
    }

    let admin = users.find(o => o.email === adminEmail);
    let adminBalance = 0;
    adminBalance = admin.balance;

    if (email === "admin@gmail.com") {
        alert("deposit Ksh " + amount + " to " + email);
        let adminIndex = users.indexOf(admin);
        Object.assign(admin, { balance: (+adminBalance + +amount) });
        users[adminIndex] = admin;

        localStorage.setItem("users", JSON.stringify(users));
        let transaction = { sender: adminEmail, reciever: email, amount: amount };
        let transactions = Array.from(JSON.parse(localStorage.getItem("transactions") || '[]'));
        transactions.push(transaction);
        localStorage.setItem("transactions", JSON.stringify(transactions));
        window.location.reload();
        return false;
    }

    if (amount > adminBalance) {
        alert('you have insuffient balance');
        return;
    }

    alert("deposit Ksh " + amount + " to " + email);

    let adminIndex = users.indexOf(admin);

    Object.assign(admin, { balance: (+adminBalance - +amount) });
    let user = users.find(o => o.email === email);
    let userIndex = users.indexOf(user);
    let userBalance = 0;
    userBalance = user.balance;
    Object.assign(user, { balance: parseInt(+userBalance + +amount, 10) });

    users[adminIndex] = admin;
    users[userIndex] = user;

    localStorage.setItem("users", JSON.stringify(users));
    let transaction = { sender: adminEmail, reciever: email, amount: amount };
    let transactions = Array.from(JSON.parse(localStorage.getItem("transactions") || '[]'));
    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    window.location.reload();
    return false;
}