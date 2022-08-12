let users = Array.from(JSON.parse(localStorage.getItem("users") || '[]'));

let user1 = {
    email: "admin@gmail.com",
    password: "12345"
};

let user2 = {
    email: "matt@gmail.com",
    password: "academy"
};

let user3 = {
    email: "chris@gmail.com",
    password: "forever"
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