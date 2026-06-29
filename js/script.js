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
        document.getElementById("message").innerHTML = `
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
    form.reset();
});

/*DEPOSIT*/

if (localStorage.getItem("balance") === null) {
    localStorage.setItem("balance", 100000);
}

let balance = Number(localStorage.getItem("balance"));
document.querySelector(".balance").textContent =
    "$" + balance.toLocaleString("es-CL");

const form = document.getElementById("formDeposito");
const mensajeElement = document.getElementById("mensaje");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const amount = parseInt(document.getElementById("montoDeposito").value);

    if (amount > 0) {
        let balance = Number(localStorage.getItem("balance")) || 0;

        balance += amount;
        localStorage.setItem("balance", balance);

        let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
        transactions.push({
            type: "deposit",
            recipient: "Self",
            amount: amount,
            date: new Date().toLocaleString()
        });
        localStorage.setItem("transactions", JSON.stringify(transactions));

        mensajeElement.innerHTML = `
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    Deposit successful! +$${amount.toLocaleString("es-CL")}<br>
                    New balance: $${balance.toLocaleString("es-CL")}
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div> 
            `;
        document.querySelector(".balance").textContent =
            "$" + balance.toLocaleString("es-CL");
    } else {
        mensajeElement.innerHTML = `
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    Please enter a valid amount.
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            `;
    }

    form.reset();
});

/*SEND MONEY*/

if (localStorage.getItem("balance") === null) {
    localStorage.setItem("balance", 100000);
}

let balance = Number(localStorage.getItem("balance"));
document.querySelector(".balance").textContent =
    "$" + balance.toLocaleString("es-CL");

const form = document.getElementById("formSend");
const messageElement = document.getElementById("message");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const recipient = document.getElementById("recipient").value;
    const amount = parseInt(document.getElementById("amount").value);

    if (amount > 0 && amount <= balance) {
        balance -= amount;
        localStorage.setItem("balance", balance);
        let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
        transactions.push({
            type: "send",
            recipient: recipient,
            amount: amount,
            date: new Date().toLocaleString()
        });
        localStorage.setItem("transactions", JSON.stringify(transactions));

        messageElement.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
        Sent $${amount.toLocaleString("es-CL")} to ${recipient}.<br>
        New balance: $${balance.toLocaleString("es-CL")}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
        `;

        document.querySelector(".balance").textContent =
            "$" + balance.toLocaleString("es-CL");
    } else {

        messageElement.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
        Invalid amount. Make sure you have enough balance.
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
        `;
    }

    form.reset();
});

/*TRANSACTIONS*/

const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
const transactionList = document.getElementById("transactionList");

if (transactions.length === 0) {
    transactionList.innerHTML = `<div class="alert alert-info">No transactions yet.</div>`;
} else {
    transactions.forEach(tx => {
        const item = document.createElement("div");
        item.className = "list-group-item d-flex justify-content-between align-items-center";

        let label = tx.type === "deposit"
            ? `<strong>Deposit</strong><br><small>${tx.date}</small>`
            : `<strong>To:</strong> ${tx.recipient}<br><small>${tx.date}</small>`;

        let badgeClass = tx.type === "deposit" ? "bg-primary" : "bg-success";

        item.innerHTML = `
    <div>${label}</div>
    <span class="badge ${badgeClass} rounded-pill">
    $${tx.amount.toLocaleString("es-CL")}
    </span>
    `;
        transactionList.appendChild(item);
    });
}

