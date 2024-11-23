
import axios from "axios";

const api = axios.create({
  baseURL: "http://SEU_IP_LOCAL:3000", // Substitua SEU_IP_LOCAL pelo IP da sua máquina
});

export default api;
