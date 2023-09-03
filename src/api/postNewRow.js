import axios from "axios";

export const postNewRow = async (newRow, table) => {
  try {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `https://expressbackendtask-production.up.railway.app/api/${table}`,
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