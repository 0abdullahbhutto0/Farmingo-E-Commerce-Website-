document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("login-form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent the default form submission

        if (!(await validateForm())) {
            // If form validation fails, do not proceed with the submission
            return;
        }

        // If form validation is successful, proceed with the form submission
        const formData = {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
        };

        try {
            const response = await fetch("/login/api/v1", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            // Read the response body as text
            // const responseBodyText = await response.text();

            if (!response.ok) {
                // Parse the text as JSON
                const errorData = await response.json()

                handleBackendErrors(errorData);
                return;
            }

            const tokenData = await response.json();
            const token = tokenData.token;

            // Store the token securely (e.g., in session storage)
            sessionStorage.setItem("token", token);

            // Redirect to the desired page or update UI based on login status
            window.location.href = "/";

            // Handle success, e.g., redirect to a new page
        } catch (error) {
            console.error("Error during form submission:", error);
        }
    });


    async function validateForm() {
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;

        // Reset error messages
        document.getElementById("email-error").innerHTML = "";
        document.getElementById("password-error").innerHTML = "";

        // Email validation
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            document.getElementById("email-error").innerHTML =
                "Please enter a valid email address.";
            return false;
        }

        // Password validation
        if (password.trim() === "") {
            document.getElementById("password-error").innerHTML =
                "Please enter your password.";
            return false;
        }

        if (password.length < 6) {
            document.getElementById("password-error").innerHTML =
                "Password must be at least 6 characters long.";
            return false;
        }

        return true; // If all validations pass, allow the form to be submitted
    }


    function handleBackendErrors(errorData) {
        // Reset previous errors
        document.getElementById("email-error").innerHTML = "";
        document.getElementById("password-error").innerHTML = "";

        // Handle errors based on the response
        if (errorData.error === "Invalid password") {
            document.getElementById("password-error").innerHTML = errorData.error;
        } else if (errorData.error === "Invalid credentials") {
            document.getElementById("email-error").innerHTML = errorData.error;
        } else if (errorData.error === "Email and Password must not be empty") {
            document.getElementById("email-error").innerHTML = errorData.error;
            document.getElementById("password-error").innerHTML = errorData.error;
        } else {
            // Handle other specific errors or display a generic message
            console.error("Unhandled backend error:", errorData);
        }
    }
});