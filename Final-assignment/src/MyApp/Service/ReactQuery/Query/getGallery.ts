import type { Photo } from "../../../component/interface/interface";
import { myaxios } from "../../axios/axios";


export const getgallery = async (limit: number, pageParam: number): Promise<Photo[]> => {
 try {

   const result = await myaxios.get("/photos", {
    params: {
      page: pageParam,
      per_page: limit,
    },
  });
   return result.data
  
 } catch (error) {
 console.error(error)
 return []
 }

};
