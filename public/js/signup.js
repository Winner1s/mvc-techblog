const signupForm = document.querySelector("#signup");

signupForm.addEventListener("submit", event => {
    event.preventDefault();

    const usernameInput = document.querySelector("#signupUsername");
    const passwordInput = document.querySelector("#signupPassword");
    const emailInput = document.querySelector("#signupEmail");
    const phoneNumberInput = document.querySelector("#signupphone#");

    const username = usernameInput.value;
    const password = passwordInput.value;
    const email = emailInput.value;
    const phoneNumber = phoneNumberInput.value;

    // Perform client-side validation
    if (!username || !password || !email || !phoneNumber) {
        alert("Please enter both username and password");
        return;
    }

    // You can add more validation logic here if needed

    const userObj = {
        username: username,
        password: password,
        email: email,
        phoneNumber: phoneNumber
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