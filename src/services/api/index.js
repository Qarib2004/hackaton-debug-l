  import axios from "axios";
  import BASE_URL from "../../constants/api.js";

  //get all data
  async function getAllData(endpoint) {
    try {
      const response = await axios(`${BASE_URL}${endpoint}`);
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }

  // get data by id
  async function getDataById(endpoint, id) {
    try {
      const response = await axios(`${BASE_URL}${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
  async function getFullUser(endpoint, id) {
    try {
      const response = await axios(`${BASE_URL}${endpoint}/${id}?_embed=tickets`);
      console.log(response.data);
      
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
  // delete data by id
  async function deleteDataById(endpoint, id) {
    try {
      const response = await axios.delete(`${BASE_URL}${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
  // add new data
  async function addNewData(endpoint, payload) {
    try {
      const response = await axios.post(`${BASE_URL}${endpoint}`, payload);
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
  // edit data by id
  async function editDataById(endpoint, id, payload) {
    try {
      const response = await axios.put(`${BASE_URL}${endpoint}/${id}`, payload);
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
  // edit data by id with patch
  async function editDataByIdWithPatch(endpoint, id, payload) {
    try {
      const response = await axios.patch(`${BASE_URL}${endpoint}/${id}`, payload);
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }

  export {
    getAllData,
    getDataById,
    deleteDataById,
    addNewData,
    editDataById,
    editDataByIdWithPatch,
    getFullUser
  };
