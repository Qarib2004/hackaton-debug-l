import { getAllData, getDataById } from "../services/api";
import { endpoints } from "../constants/api";
const card = document.getElementById("cards");
let events = null;
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

document.addEventListener("DOMContentLoaded", async function () {
  const eventData = await getAllData(endpoints.events);
  events = eventData
  renderTicketCard(eventData);
});

const renderTicketCard = (arr) => {
  card.innerHTML = "";

  arr.forEach((event) => {
    card.innerHTML += `
    <div
    id="cards"
    class="bg-white rounded-lg shadow flex items-center gap-6 p-4"
  >
    <div class="w-48 h-32 bg-gray-900 rounded-lg overflow-hidden">
      <img
        src="https://p1.hiclipart.com/preview/196/330/382/cine-yellow-ticket-illustration.jpg"
        alt="Conductor"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="flex-1">
      <span class="px-3 py-1 bg-gray-100 rounded-full text-sm"
        >${event.ageRestriction}</span
      >
      <h2 class="text-xl font-bold mt-2">
       
       ${event.name}
      </h2>
      <p class="text-gray-600">
        ${event.organizer}
      </p>
    </div>

    <div class="flex flex-col gap-2">
      <button class="bg-teal-500 text-white px-8 py-2 rounded-lg">
        Tickets
      </button>
      <span class="text-right">${event.price}$</span>
    </div>
  </div>
</div>
</div>
   
    `;
  });
};

const searchInput = document.getElementById("search");
const cards = document.getElementById("cards");

searchInput.addEventListener("input", (e) => {
  const searchValue = e.target.value.toLowerCase();

  const filteredEvents = data.filter(
    (event) =>
      event.title.toLowerCase().includes(searchValue) ||
      event.description.toLowerCase().includes(searchValue)
  );

  renderTicketCard(filteredEvents);
});

const sortPrice = document.getElementById("sort-price");

sortPrice.addEventListener("change", (e) => {
  const sortDirection = e.target.value;

  const sortedEvents = [...events].sort((a, b) => {
    if (sortDirection === "asc") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
    
  });

  console.log(sortDirection)
  
  renderTicketCard(sortedEvents);
});

const sortTitle = document.getElementById("sort-title");

sortTitle.addEventListener("change", (e) => {
  const sortDirection = e.target.value;

  
    const sortedEvents = [...events].sort((a, b) => {
      if (sortDirection === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

    renderTicketCard(sortedEvents);
  });

