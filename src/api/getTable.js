import axios from "axios";

export const getTable = async (table) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://expressbackendtask-production.up.railway.app/api/${table}`,
      headers: {},
    };

    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};