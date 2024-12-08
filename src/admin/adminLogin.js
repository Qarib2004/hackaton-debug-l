const nameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
// const btn = document.getElementById("id");
const loginForm = document.getElementById("loginForm");




loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const username = nameInput.value.trim();
  const password = passwordInput.value.trim();

  try {
    const response = await fetch("https://debug-legends-api.glitch.me/users");
    const users = await response.json();

    const user = users.find((user) => user.name === username);
    console.log(user);
    if (user && user.password === password && user.role=="admin") {
    //   console.log(user);

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
        })
        .catch((err) => {
          console.log(err);
        });

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome to Admin panel !",
        timer: 3000,
        timerProgressBar: true,
        willClose: () => {
          window.location.href = "./adminPanel.html";
        },
      });
    } else {
    //   islogged = false;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid username or password.",
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

