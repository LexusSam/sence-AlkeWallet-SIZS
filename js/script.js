/*REGISTER*/

document.getElementById("form-register").addEventListener("submit", function (event) {
    event.preventDefault();

    /*declare and assign a value*/
    const name = document.getElementById("name").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_password").value;

    /*password validation*/
    if (password !== confirmPassword) {
        document.getElementById("message").innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
        Passwords don't match
        <button type="button" class="btn btn-close" data-bs-dismiss="alert"></button>
        </div>
        `
        return;
    };
    /*add new user */
    const newUser = {
        name,
        username,
        password
    }
    /*storage new user in local storage*/
    let users = JSON.parse(localStorage.getItem("users")) || [];

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    document.getElementById("message").innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
        Successfully registered. Redirecting...
        <button type="button" class="btn btn-close" data-bs-dismiss="alert"></button>
        </div>
        `
    setTimeout(() => {
        window.location.href = "login.html";
    }, 3000);

});
/*LOGIN */

document.getElementById("form-login").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userFound = users.find(function (user) {
        return user.username === username && user.password === password;

    })
    if (userFound) {

        localStorage.setItem("userLogged", JSON.stringify(userFound))

        document.getElementById("message").indexHTML = `
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                Successfully logged in. Redirecting...
                <button type="button" class="btn btn-close" data-bs-dismiss="alert"></button>
                </div>
                `;

        setTimeout(() => {
            window.location.href = "menu.html";
        }, 3000);

    }
    else {
        document.getElementById("message").innerHTML = `
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                Invalid username or password.
                <button type="button" class="btn btn-close" data-bs-dismiss="alert"></button>
                </div>
                `

        setTimeout(() => {
            document.getElementById("message").innerHTML = "";
        }, 3000);
    }
})