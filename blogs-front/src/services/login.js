import axios from "axios";
const config = require("../utils/config").default;
//const baseUrl = "http://localhost:3003/api/login";
const baseUrl = `${config.API_URL}/api/login`;

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login };
