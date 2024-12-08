import {getAllData  } from "../services/api/index.js";
  import { endpoints } from "../constants/api.js";
  
const currentUserId = localStorage.getItem("currentUserId") || null;

if (currentUserId) {
  getDataById(endpoints.users, currentUserId).then((res) => {
    console.log(res);
    const loginWrapper = document.getElementById("users-wrapper");
    const signInButton = document.getElementById("signIn");
    const signUpButton = document.getElementById("signUp");

    if (signInButton) signInButton.style.display = "none";
    if (signUpButton) signUpButton.style.display = "none";

    const userInfoDiv = document.createElement("div");
    userInfoDiv.id = "userInfo";

    userInfoDiv.innerHTML = `
          <span >Welcome, ${res.username}!</span>
          <button id="logOut">Log Out</button>
      `;

    loginWrapper.appendChild(userInfoDiv);

    const logOutButton = document.getElementById("logOut");
    logOutButton.addEventListener("click", () => {
      localStorage.removeItem("currentUserId");
      userInfoDiv.remove();
      if (signInButton) signInButton.style.display = "inline-block";
      if (signUpButton) signUpButton.style.display = "inline-block";
    });
  });
} else {
  console.log("Not user");
}

  
  async function loadPlaces() {
    const placesContainer = document.querySelector(".grid");
    try {
      const places = await getAllData(endpoints.venues); 
      placesContainer.innerHTML = ""; 
  
      places.forEach((place) => {
        const placeCard = `
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
              <div class="relative">
                  <img src="${place.image}" 
                       alt="${place.name}" class="w-full h-48 object-cover">
                  <div class="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 hover:bg-opacity-0"></div>
              </div>
              <div class="p-6">
                  <h2 class="text-lg font-semibold text-gray-800 hover:text-indigo-600 transition duration-300">
                      ${place.name}
                  </h2>
                  <p class="text-gray-500 text-sm mt-2">${place.description}</p>
              </div>
              <div class="p-6 flex items-center justify-between border-t border-gray-200">
                  <a href="./placesDetails.html?id=${place.id}">
                    <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Details
                    </button>
                  </a>
              </div>
          </div>
        `;
        placesContainer.insertAdjacentHTML("beforeend", placeCard);
      });
  
    }
    catch{
        console.error("error");
    }
  }
document.addEventListener("DOMContentLoaded",loadPlaces)