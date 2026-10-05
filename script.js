 

const container = document.getElementById("container");

const registerBtn = document.getElementById("register");

const loginBtn = document.getElementById("login");

const loginForm = document.getElementById("loginForm");

const registerForm = document.getElementById("registerForm");

const loginMessage = document.getElementById("loginMessage");

const registerMessage = document.getElementById("registerMessage");


 

registerBtn.addEventListener("click", function () {

    container.classList.add("active");

});


loginBtn.addEventListener("click", function () {

    container.classList.remove("active");

});


 

async function getUsers() {

    try {

        const response = await fetch("users.json");

        if (!response.ok) {

            throw new Error("Unable to load users.json");

        }

        const data = await response.json();

        return data.users;

    }

    catch (error) {

        console.error(error);

        return [];

    }

}

 

loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();


  

    loginMessage.textContent = "";


     

    const email =
        document
        .getElementById("loginEmail")
        .value
        .trim();

    const password =
        document
        .getElementById("loginPassword")
        .value;


     

    if (!email || !password) {

        loginMessage.style.color = "red";

        loginMessage.textContent =
            "Please enter email and password.";

        return;

    }


   

    const users = await getUsers();


    

    const user = users.find(function (item) {

        return (
            item.email.toLowerCase() ===
            email.toLowerCase()
            &&
            item.password === password
        );

    });


    // Invalid login 

    if (!user) {

        loginMessage.style.color = "red";

        loginMessage.textContent =
            "Invalid email or password.";

        return;

    }


    // Login success 

    loginMessage.style.color = "green";

    loginMessage.textContent =
        "Login successful!";


    // Save session 

    localStorage.setItem(
        "loggedInUser",
        JSON.stringify(user)
    );


    /* Redirect */

    setTimeout(function () {

        window.location.href = "dashboard.html";

    }, 800);

});



registerForm.addEventListener("submit", async function (event) {

    event.preventDefault();




    registerMessage.textContent = "";



    const name =
        document
        .getElementById("registerName")
        .value
        .trim();


    const email =
        document
        .getElementById("registerEmail")
        .value
        .trim();


    const password =
        document
        .getElementById("registerPassword")
        .value;




    if (!name || !email || !password) {

        registerMessage.style.color = "red";

        registerMessage.textContent =
            "Please fill all fields.";

        return;

    }


    if (password.length < 6) {

        registerMessage.style.color = "red";

        registerMessage.textContent =
            "Password must be at least 6 characters.";

        return;

    }


    /* Load existing users */

    const users = await getUsers();


    /* Check email */

    const existingUser = users.find(function (user) {

        return (
            user.email.toLowerCase() ===
            email.toLowerCase()
        );

    });


    if (existingUser) {

        registerMessage.style.color = "red";

        registerMessage.textContent =
            "This email is already registered.";

        return;

    }



    const newUser = {

        id: Date.now(),

        name: name,

        email: email,

        password: password

    };


    /* Get locally registered users 

    const localUsers =
        JSON.parse(
            localStorage.getItem("registeredUsers")
        ) || [];


  
        

    localUsers.push(newUser);



    localStorage.setItem(
        "registeredUsers",
        JSON.stringify(localUsers)
    );



    registerMessage.style.color = "green";

    registerMessage.textContent =
        "Registration successful!";


  

    registerForm.reset();


    /* Move to login */

    setTimeout(function () {

        container.classList.remove("active");

    }, 1200);

});



//    LOGIN WITH REGISTERED USERS



async function loginUser(email, password) {

    const jsonUsers = await getUsers();


    const localUsers =
        JSON.parse(
            localStorage.getItem("registeredUsers")
        ) || [];


    const allUsers = [
        ...jsonUsers,
        ...localUsers
    ];


    return allUsers.find(function (user) {

        return (
            user.email.toLowerCase() ===
            email.toLowerCase()
            &&
            user.password === password
        );

    });

}


// /* ==================================================
//    OVERRIDE LOGIN CHECK
// ================================================== */

// loginForm.addEventListener("submit", async function () {

//     /*
//         The main login handler already works.
//         This listener is intentionally left
//         without another redirect.
//     */

// });