import axios from "axios";
const config = require("../utils/config").default;
const baseUrl = `${config.API_URL}/api/users`;

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export default {
  getAll,
};
