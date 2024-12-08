import axios from "axios";

const usersTab = document.getElementById("users-tab");
const usersTable = document.getElementById("table-users");
const eventsTab = document.getElementById("events-tab");
const eventsTable = document.getElementById("table-events");
const userTableContent = document.getElementById("userTableContent");
const eventTableContent = document.getElementById("eventTableContent");
const editButtons = document.querySelectorAll(".edit-btn");
const editModal = document.getElementById("editModal");
const editName = document.getElementById("editName");
const editCategory = document.getElementById("editCategory");
const editPrice = document.getElementById("editPrice");

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
    eventTableContent.innerHTML = "";
    const allEvents = events.map((x) => {
      eventTableContent.innerHTML += `
       <tr>
            <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center items-center">
                            <div>
                                <img class="h-16 w-full " src="${x.posterURL}" alt="">
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
                        <a href="#" class="text-indigo-600 hover:text-indigo-900 editBtn" data-id=${x.id}>Edit</a>
                        <span class="ml-2 text-red-600 hover:text-red-900 deleteBtn" data-id=${x.id}>Delete</span>
                    </td>
                </tr>
        `;

      const deleteBtn = document.querySelectorAll(".deleteBtn");
      deleteBtn.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          const eventId = e.target.getAttribute("data-id");
          await deleteEvent(eventId);
        });
      });
    });

    const editButtons = document.querySelectorAll(".editBtn");
    editButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const id = button.getAttribute("data-id");
        const name = button.getAttribute("data-name");
        const category = button.getAttribute("data-category");
        const price = button.getAttribute("data-price");

        editName.value = name;
        editCategory.value = category;
        editPrice.value = price;
        editModal.classList.remove("hidden");
        editModal.setAttribute("data-id", id);
      });
    });
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

async function deleteEvent(id) {
  try {
    const res = await axios.delete(
      "https://debug-legends-api.glitch.me/events/" + id
    );
    console.log(res);

    getEvents();
  } catch (error) {
    console.error("Error fetching users:", error);
    alert("failed");
  }
}

async function editEvent(id) {
  try {
    const res = await axios.put(
      "https://debug-legends-api.glitch.me/events/" + id
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    alert("failed");
  }
}

document
  .getElementById("editEventForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const editModal = document.getElementById("editModal");
    const id = editModal.getAttribute("data-id");
    const updatedName = document.getElementById("editName").value;
    const updatedCategory = document.getElementById("editCategory").value;
    const updatedPrice = document.getElementById("editPrice").value;

    try {
      await axios.put("https://debug-legends-api.glitch.me/events/${id}", {
        name: updatedName,
        category: updatedCategory,
        price: updatedPrice,
      });

      alert("Event updated successfully.");
      editModal.classList.add("hidden");
      getEvents();
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update the event. Please try again.");
    }
  });

document.getElementById("cancelEdit").addEventListener("click", () => {
  document.getElementById("editModal").classList.add("hidden");
});

getUsers();
getEvents();
