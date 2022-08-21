import axios from "axios";
const config = require("../utils/config").default;
const baseUrl = `${config.API_URL}/api/blogs`;
// require("dotenv");
// const baseUrl = "http://localhost:3001/api/persons";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const like = async (id) => {
  const response = await axios.post(`${baseUrl}/${id}/like`);
  return response.data;
};

const comment = async (id, content) => {
  console.log("blogService->content: ", content);
  const response = await axios.post(`${baseUrl}/${id}/comment`, content);
  console.log("response", response);
  return response.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default {
  comment,
  getAll,
  create,
  like,
  update,
  deleteBlog,
  setToken,
};
