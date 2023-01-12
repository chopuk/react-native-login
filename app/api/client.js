import axios from "axios";

export default axios.create({baseURL: 'http://192.168.0.220:3000/graphql'})