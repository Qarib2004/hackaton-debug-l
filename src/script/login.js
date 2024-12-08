const loginForm = document.querySelector("#login-form");
const passwordInput = document.querySelector("#password");
const nameInput = document.querySelector("#username");

loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const username = nameInput.value.trim();
  const password = passwordInput.value.trim();

  try {
    const response = await fetch("https://debug-legends-api.glitch.me/users");
    const users = await response.json();
    console.log(users);
    console.log(username);

    const user = users.find((user) => user.username == username);
    console.log(user);
    if (user && user.password === password) {
      console.log(user);

      fetch(`https://debug-legends-api.glitch.me/users/${user.id}`, {
        method: "PATCH",
        body: JSON.stringify({ isLogged: true }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          console.log(resp);
          return resp.json();
        })
        .then((resp) => {
          console.log(resp.id);
          localStorage.setItem("currentUserId", resp.id);
          Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: "You are now logged in!",
            timer: 3000,
            timerProgressBar: true,
            willClose: () => {
              window.location.href = "/";
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });

      
    }
  } catch (error) {
    console.error("Error during login:", error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "An error occurred, please try again later.",
    });
  }
});

const togglePassword = document.querySelector("#toggle-password");

togglePassword.addEventListener("click", function () {
  const type = passwordInput.type === "password" ? "text" : "password";

  passwordInput.type = type;

  if (type === "password") {
    togglePassword.classList.remove("fa-eye-slash");
    togglePassword.classList.add("fa-eye");
  } else {
    togglePassword.classList.remove("fa-eye");
    togglePassword.classList.add("fa-eye-slash");
  }
});
