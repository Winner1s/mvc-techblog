const signupForm = document.querySelector("#signup");

signupForm.addEventListener("submit", event => {
    event.preventDefault();

    const usernameInput = document.querySelector("#signupUsername");
    const passwordInput = document.querySelector("#signupPassword");

    const username = usernameInput.value;
    const password = passwordInput.value;

    // Perform client-side validation
    if (!username || !password) {
        alert("Please enter both username and password");
        return;
    }

    // You can add more validation logic here if needed

    const userObj = {
        username: username,
        password: password,
    };

    fetch("/api/users/", {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => {
        if (res.ok) {
            console.log("User is signed up");
            location.href = "/dashboard";
        } else {
            throw new Error("Failed to sign up");
        }
    })
    .catch(error => {
        console.error("Error signing up:", error);
        alert("Please try again");
    });
});