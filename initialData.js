let users = Array.from(JSON.parse(localStorage.getItem("users") || '[]'));
let transactions = Array.from(JSON.parse(localStorage.getItem("transactions") || '[]'));

let user1 = {
    email: "admin@gmail.com",
    password: "12345",
    balance: 11450
};

let user2 = {
    email: "matt@gmail.com",
    password: "academy",
    balance: 300
};

let user3 = {
    email: "chris@gmail.com",
    password: "forever",
    balance: 200,
};

if (!(users.find(o => o.email === user1.email))) {
    users.push(user1);
}
if (!(users.find(o => o.email === user2.email))) {
    users.push(user2);
}
if (!(users.find(o => o.email === user3.email))) {
    users.push(user3);
}

localStorage.setItem("users", JSON.stringify(users));
localStorage.setItem("transactions", JSON.stringify(transactions));
