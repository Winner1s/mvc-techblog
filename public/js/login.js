const loginForm = document.querySelector("#login");

loginForm.addEventListener("submit", event => {
    event.preventDefault();

    const usernameInput = document.querySelector("#loginUsername");
    const passwordInput = document.querySelector("#loginPassword");

    const username = usernameInput.value;
    const password = passwordInput.value;

    if (!username || !password) {
        alert("Please enter both username and password");
        return;
    }

    const userObj = {
        username: username,
        password: password,
    };

    fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => {
        if (res.ok) {
            console.log("User is logged in");
            location.href = "/dashboard";
        } else {
            throw new Error("Failed to log in");
        }
    })
    .catch(error => {
        console.error("Error logging in:", error);
        alert("Please try again");
    });
});