import { HOST } from "@/utils/contants"
import axios from "axios" 
const apiClient = axios.create({
    baseURL:HOST,
})

export default apiClient