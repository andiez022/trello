import axios from './customize_axios';

const fetchAllTask = () => {
  return axios.get("/api/v1/todo");
};

export { fetchAllTask };
