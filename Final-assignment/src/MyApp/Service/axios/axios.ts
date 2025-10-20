import axios from "axios";
import { myKey } from "../ApiKey/ApiKey";

export const myaxios = axios.create({
  baseURL: "https://api.unsplash.com", 
  headers: {
    Authorization: `Client-ID ${myKey}` 
  }
});
