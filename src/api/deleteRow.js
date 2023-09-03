import axios from "axios";

export const deleteRow = async (ID, table) => {
  try {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `https://expressbackendtask-production.up.railway.app/api/${table}/${ID}`,
      headers: {},
    };
    const response = await axios.request(config);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};