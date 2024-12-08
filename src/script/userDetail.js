import { getAllData } from "../services/api";
import { endpoints } from "../constants/api";
const card = document.getElementById("cards");

document.addEventListener("DOMContentLoaded", async function () {
    const usersData = await getAllData(endpoints.users)
  drawUserCard(usersData);
});




const drawUserCard = (arr) => {
    card.innerHTML = "";
  
    arr.forEach((user) => {
      card.innerHTML += `
      
        <div class="flex flex-col pb-3">
                                <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Name</dt>
                                <dd class="text-lg font-semibold">${user.username}</dd>
                            </div>
                            <div class="flex flex-col py-3">
                                <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">e-mail</dt>
                                <dd class="text-lg font-semibold">${user.email}</dd>
                            </div>
                            <div class="flex flex-col py-3">
                                <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Balance</dt>
                                <dd class="text-lg font-semibold">${user.balance}</dd>
                            </div>
                            <div class="flex flex-col py-3">
                                <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Total Spent Money</dt>
                                <dd class="text-lg font-semibold">${user.totalSpentMoney}</dd>
                            </div>
      `;
    });
  };