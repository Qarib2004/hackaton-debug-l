import { getDataById  } from "../services/api/index.js";
  import { endpoints } from "../constants/api.js";
  let placeId=new URLSearchParams(window.location.search).get("id")

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