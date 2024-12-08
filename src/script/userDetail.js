import { getAllData, getFullUser, editDataById } from "../services/api";
import { endpoints } from "../constants/api";
const card = document.getElementById("cards");
const fav = document.getElementById("fav");

let events = [];

const tickets = document.getElementById("tickets");

const id = localStorage.getItem("currentUserId") || null;

document.addEventListener("DOMContentLoaded", createMe);

async function createMe() {
  await getAllEvents();
  const usersData = await getFullUser(endpoints.users, id);
  drawUserCard(usersData);
  drawTicketCard(usersData.tickets);
  drawFavoritsCard(usersData.favorites);
}

const getAllEvents = async () => {
  events = await getAllData(endpoints.events);

  console.log(events);
};

function drawFavoritsCard(arr) {
  arr.forEach((favObj) => {
    let myFav = events.find((ev) => ev.id == favObj.id);
    fav.innerHTML = `
         <div class="flex flex-col pb-3">
                                <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Name</dt>
                                <dd class="text-lg font-semibold">${myFav.name}</dd>
                            </div>
                            <div class="flex flex-col py-3">
                                <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Organizer</dt>
                                <dd class="text-lg font-semibold">${myFav.organizer}</dd>
                            </div>
`;
  });
}

const drawUserCard = (obj) => {
  card.innerHTML = `
      
        <div class="flex flex-col pb-3">
                                <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Name</dt>
                                <dd class="text-lg font-semibold">${obj.username}</dd>
                            </div>
                            <div class="flex flex-col py-3">
                                <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">e-mail</dt>
                                <dd class="text-lg font-semibold">${obj.email}</dd>
                            </div>
                            <div class="flex flex-col py-3">
                                <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Balance</dt>
                                <dd class="text-lg font-semibold">${obj.balance}</dd>
                            </div>
                            <div class="flex flex-col py-3">
                                <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Total Spent Money</dt>
                                <dd class="text-lg font-semibold">${obj.totalSpentMoney}</dd>
                            </div>
                            <button class="editbtn">Edit</button>
      `;
  document.querySelector("#imagee").src = obj.profilePictureURL;
  document.querySelector("#bigName").innerText = obj.username;
  document.querySelector(".editbtn").addEventListener("click", () => {
    (async () => {
      const { value: formValues } = await Swal.fire({
        title: "Edit User Info",
        html:
          "<p>Username:</p>" +
          `<input id="swal-input1" class="swal2-input" value="${obj.username}">` +
          "<p>Email:</p>" +
          `<input id="swal-input2" class="swal2-input" value="${obj.email}">` +
          "<p>Password:</p>" +
          `<input id="swal-input3" class="swal2-input" value="${obj.password}">`,
        focusConfirm: false,
        preConfirm: async () => {
          const editObj = { ...obj };
          console.log(editObj);
          if (document.getElementById("swal-input1").value.trim()) {
            editObj.username = document.getElementById("swal-input1").value;
          }
          if (document.getElementById("swal-input2").value.trim()) {
            editObj.email = document.getElementById("swal-input2").value;
          }
          if (document.getElementById("swal-input3").value.trim()) {
            editObj.password = document.getElementById("swal-input3").value;
          }

          await editDataById(endpoints.users, id, editObj);
          createMe()
          return "Edit successfully";

          // return [
          //   document.getElementById('swal-input1').value,
          //   document.getElementById('swal-input2').value
          // ]
        },
      });

      if (formValues) {
        Swal.fire(JSON.stringify(formValues));
      }
    })();
  });
};
const drawTicketCard = (arr) => {
  tickets.innerHTML = "";

  arr.forEach((element) => {
    tickets.innerHTML += `
          
            <div class="flex flex-col pb-3" >
                                    <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Ticket Quantity</dt>
                                    <dd class="text-lg font-semibold">${element.quantity}</dd>
                                </div>
                                <div class="flex flex-col py-3">
                                    <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Ticket Price</dt>
                                    <dd class="text-lg font-semibold">${element.price}</dd>
                                </div>
                                <div class="flex flex-col py-3">
                                    <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Ticket Purchase Date</dt>
                                    <dd class="text-lg font-semibold">${element.purchaseDate}</dd>
                                </div>
                                <div class="flex flex-col py-3">
                                    <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Ticket Code</dt>
                                    <dd class="text-lg font-semibold">${element.ticketCode}</dd>
                                </div>
          `;
  });
};
