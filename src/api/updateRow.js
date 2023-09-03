import axios from "axios";

export const updateRow = async (ID, newRow, table) => {
  try {
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `https://expressbackendtask-production.up.railway.app/api/${table}/${ID}`,
      headers: {},
      data: newRow
    };
    const response = await axios.request(config);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};