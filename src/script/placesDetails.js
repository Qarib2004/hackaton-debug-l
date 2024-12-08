import { getDataById  } from "../services/api/index.js";
  import { endpoints } from "../constants/api.js";
  let placeId=new URLSearchParams(window.location.search).get("id")
  
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


async function placesDetails(){
    const placeDetail = document.querySelector(".card");
    try{
        const details = await getDataById(endpoints.venues, placeId);
        console.log(details)
  
          const detailsCard =`
                    <div class="card flex flex-wrap -mx-4">
            <!-- Product Images -->
            <div class="w-full md:w-1/2 px-4 mt-6">
              <img src=${details.img}" alt="Product"
                          class="w-full h-auto rounded-lg shadow-md mb-4" id="mainImage">

            </div>
      
            <!-- Product Details -->
            <div class="w-full md:w-1/2 px-4 mt-5">
                <div class="p-8">
                    <h1 class="text-4xl font-bold text-gray-800 mb-4">${details.name}</h1>
                    <p class="text-gray-500 text-lg mb-6">
                        <span class="font-semibold text-gray-700">Address: </span> 
                        ${details.address}
                    </p>
                    <p class="text-gray-500 text-lg mb-6">
                        <span class="font-semibold text-gray-700">Capacity: </span> 
                        ${details.capacity}
                    </p>
                    <p class="text-gray-500 text-lg mb-6">
                        <span class="font-semibold text-gray-700">Description: </span> 
                        ${details.description}
                    </p>
                    <p class="text-gray-500 text-lg mb-6">
                        <span class="font-semibold text-gray-700">Contact Email: </span> 
                        <a href="#" class="text-blue-600 hover:underline">${details.contactEmail}</a>
                    </p>
     
                </div>
                  
              </div>
          </div>
        </div>
          ` ;
          placeDetail.insertAdjacentHTML("beforeend",detailsCard)
        
    }
    catch{
        console.error("error")
    }
}   
document.addEventListener("DOMContentLoaded",placesDetails)