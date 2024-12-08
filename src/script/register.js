const registerForm = document.querySelector("#register-form");
const passwordInput = document.querySelector("#password");
const emailInput = document.querySelector("#email");
const nameInput = document.querySelector("#username");
const fileInput = document.querySelector("#file");

let fileUrl = null;
fileInput.addEventListener("input", function(e){
console.log(e);
let reader = new FileReader();
reader.readAsDataURL(e.target.files[0])
reader.onload=()=>{
    fileUrl=reader.result;
    console.log(fileUrl);
    
}
})
registerForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const correctFile = fileInput.files[0];

  let profileImageURL = null;


  if (correctFile) {
    profileImageURL = fileUrl;

  }

  const username = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const file = fileInput.files[0]; 

  const usernameRegex = /^.{4,}$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.(com)$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/\\|`~-]).{8,}$/;

//   if (!username || !email || !password) {
//     Swal.fire({
//       icon: "error",
//       title: "Oops...",
//       text: "Please fill all the fields.",
//     });
//     return;
//   }

  if (!usernameRegex.test(username)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Username must be at least 4 characters.",
    });
    return;
  }

  if (!emailRegex.test(email)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please enter a valid email ending with .com.",
    });
    return;
  }

  if (!passwordRegex.test(password)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Password must be at least 8 characters, contain 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.",
    });
    return;
  }

  const user = {
    name: username,
    email: email,
    password: password,
    profileImage: profileImageURL,
    isLogged: false,
  };

  try {
    const response = await fetch("https://debug-legends-api.glitch.me/users");
    const users = await response.json();

    const userExists = users.some(
      (user) =>
        user.name === username ||
        user.email === email ||
        user.password === password
    );

    if (userExists) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "The username, email, or password is already taken. Please choose another.",
      });
      return;
    }

    const postResponse = await fetch(
      "https://debug-legends-api.glitch.me/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );

    if (postResponse.ok) {
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "User registered successfully!",
        timer: 3000,
        timerProgressBar: true,
      }).then(() => {
        window.location.href = "/login.html";
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong, please try again.",
      });
    }
  } catch (error) {
    console.error("Error during registration:", error);
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