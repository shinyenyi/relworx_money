let email = sessionStorage.getItem("email");
document.querySelector(".title").innerHTML = email;
let users = Array.from(JSON.parse(localStorage.getItem("users") || '[]'));
let user = users.find(o => o.email === email);
let balance = user.balance;

function logOut() {
    sessionStorage.clear();
    window.location.href = "index.html";
    return false;
}

function checkBalance() {
    let button = document.getElementById("checkBalance");
    if (button.value === "Check Balance") button.value = "Balance: Ksh " + balance;
    else button.value = "Check Balance";
}

function sendMoney() {
    let recieverEmail = document.getElementById('reciever').value;
    let amount = document.getElementById('amount').value;

    let reciever = users.find(o => o.email === recieverEmail);
    let recieverBal = reciever.balance;

    if (!reciever || !amount || recieverEmail === email) {
        alert('enter valid amount or email')
        return;
    }
    if (amount > balance) {
        alert('you have insufficient balance');
        return;
    }

    alert("deposit Ksh " + amount + " to " + recieverEmail);

    let recieverIndex = users.indexOf(reciever);
    let senderIndex = users.indexOf(user);

    Object.assign(reciever, { balance: parseInt(+recieverBal + +amount, 10) });
    Object.assign(user, { balance: parseInt(+balance - +amount, 10) });

    users[recieverIndex] = reciever;
    users[senderIndex] = user;

    localStorage.setItem("users", JSON.stringify(users));
    let transaction = { sender: email, reciever: recieverEmail, amount: amount };
    let transactions = Array.from(JSON.parse(localStorage.getItem("transactions") || '[]'));
    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    window.location.reload();
    return false;
}