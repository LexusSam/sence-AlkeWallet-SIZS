document.getElementById("form-register").addEventListener("submit", function (event) {
    event.preventDefault();

    /*declarar la variable y asignarle el valor sacado del input*/
    const name = document.getElementById("name").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_password").value;

    /*validacion de password*/
    if (password !== confirmPassword) {
        document.getElementById("message").innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
        Passwords don't match
        <button type="button" class="btn btn-close" data-bs-dismiss="alert"></button>
        </div>
        `
        return;
    };
    /*agregar usuario nuevo */
    const newUser = {
        name,
        username,
        password
    }
    /*guardar a nuevo usuario en el almacenamiento local*/
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
