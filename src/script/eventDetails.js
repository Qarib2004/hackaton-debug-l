import { getDataById  } from "../services/api/index.js";
  import { endpoints } from "../constants/api.js";
  let eventId =new URLSearchParams(window.location.search).get("id")

  async function eventDetails(){
    const eventDetail = document.querySelector(".card");
    try{
        const details = await getDataById(endpoints.events, eventId);
        console.log(details)
  
          const detailsCard =`            <div class="grid grid-cols-1 md:grid-cols-2">
                <!-- Event Details Section -->
                <div class="p-8">
                    <h1 class="text-4xl font-bold text-gray-800 mb-4">${details.name}</h1>
                    <p class="text-gray-500 text-lg mb-6">
                        <span class="font-semibold text-gray-700">Organizer:</span> 
                       ${details.organizer}
                    </p>
                    <p class="text-gray-500 text-lg mb-6">
                        <span class="font-semibold text-gray-700">Date & Time: </span> 
                        ${details.dateTime}
                    </p>
                    <p class="text-gray-500 text-lg mb-6">
                        <span class="font-semibold text-gray-700">Category: </span> 
                         ${details.venueId}
                    </p>
                    <p class="text-gray-500 text-lg mb-6">
                        <span class="font-semibold text-gray-700">Tickets Available: </span> 
                        ${details.ticketsAvailable}
                    </p>
                    <p class="text-gray-500 text-lg mb-6">
                        <span class="font-semibold text-gray-700">Price: </span> 
                        $${details.price}
                    </p>
                    <p class="text-gray-500 text-lg mb-6">
                        <span class="font-semibold text-gray-700">Description: </span> 
                        ${details.description}
                    </p>

                    <!-- Buttons -->
                    <div class="flex space-x-4">
                        <button
                            class="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                            Buy
                        </button>
                        <button
                            class="bg-gray-200 flex gap-2 items-center text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                            Favorite
                        </button>
                    </div>
                </div>
                                <!-- Poster Section -->
                                <div class="p-4">
                                    <img 
                                        src="${details.posterURL}" 
                                        alt="Tech Conference 2024 Poster"
                                        class="w-full h-auto rounded-lg shadow-md"
                                        id="mainPoster">
                                </div>
            </div>`;
            eventDetail.insertAdjacentHTML("beforeend",detailsCard)
    }
    catch{
        console.error("error")
    }
  }
  document.addEventListener("DOMContentLoaded",eventDetails)