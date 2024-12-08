import axios from "axios";

const usersTab = document.getElementById("users-tab");
const usersTable = document.getElementById("table-users");
const eventsTab = document.getElementById("events-tab");
const eventsTable = document.getElementById("table-events");
const userTableContent = document.getElementById("userTableContent");
const eventTableContent = document.getElementById("eventTableContent");
usersTab.addEventListener("click", () => {
  usersTable.style.display = "block";
  eventsTable.style.display = "none";
  usersTab.style.color = "#0369a1";
  eventsTab.style.color = "#6b7280";
});
eventsTab.addEventListener("click", () => {
  eventsTable.style.display = "block";
  usersTable.style.display = "none";
  eventsTab.style.color = "#0369a1";
  usersTab.style.color = "#6b7280";
});

let users = [];
let events = [];

async function getUsers() {
  try {
    const res = await axios.get("https://debug-legends-api.glitch.me/users");
    users = res.data;
    const allUsers = users.map((x) => {
      userTableContent.innerHTML += `
      <tr>
       <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <img
                          class="h-10 w-10 rounded-full"
                          src="${x.profilePictureURL}"
                          alt=""
                        />
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          ${x.username}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                     ${x.email}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-gray-500">
               
                        ${x.balance}$
                  
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${x.role}
                  </td>

                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <span class="text-gray-900">  ${x.accountCreationDate}</span>
                  </td>
             </tr>
        `;
    });
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}
async function getEvents() {
  try {
    const res = await axios.get("https://debug-legends-api.glitch.me/events");
    events = res.data;
    const allEvents = events.map((x) => {
      eventTableContent.innerHTML += `
       <tr>
            <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            <div class="flex-shrink-0 h-10 w-10">
                                <img class="h-14 w-12 " src="${x.posterURL}" alt="">
                            </div>
                            <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">
                                   ${x.name}
                                </div>
                                <div class="text-sm text-gray-500">
                                    ${x.organizer}
                                </div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">${x.category}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900 text-wrap">${x.description}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${x.ageRestriction}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${x.duration}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${x.price}$
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                    >
                          ${x.ticketsAvailable}
                    </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
                    >
                          ${x.soldTickets}
                    </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                        <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                        <a href="#" class="ml-2 text-red-600 hover:text-red-900">Delete</a>
                    </td>
                </tr>
        `;
    });
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

getUsers();
getEvents();
