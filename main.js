const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");

signupBtn.onclick = (() => {
    loginForm.style.marginLeft = "-50%";
    loginText.style.marginLeft = "-50%";
});

loginBtn.onclick = (() => {
    loginForm.style.marginLeft = "0%";
    loginText.style.marginLeft = "0%";
});

signupLink.onclick = (() => {
    signupBtn.click();
    return false;
});

function logIn() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let users = Array.from(JSON.parse(localStorage.getItem("users") || '[]'));

    for (let i = 0; i < users.length; i++) {
        if (email === users[i].email && password === users[i].password) {
            if (email === "admin@gmail.com") {
                sessionStorage.setItem("email", email);
                window.location.href = "users/admin.html";
                return false;
            }
            sessionStorage.setItem("email", email);
            window.location.href = "users/user.html";
            return false;
        }
    }
    alert("incorrect email or password");
}

function signUp() {
    let email = document.getElementById('signupEmail').value;
    let password = document.getElementById('signupPassword').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    if (password != confirmPassword) {
        alert('password must match');
        return;
    }

    let users = Array.from(JSON.parse(localStorage.getItem("users") || '[]'));

    let user = users.find(o => o.email === email);

    if (!user) {
        user = { email: email, password: password, balance: 0 };
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        loginBtn.click();
        alert('please login');
        return;
    } else {
        alert('email already exists');
    }
    return;
}