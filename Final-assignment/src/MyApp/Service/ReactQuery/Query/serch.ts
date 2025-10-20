
import { myaxios } from "../../axios/axios";
import type { Photo } from "../../../component/interface/interface";
export const serch = async ( query: string, page = 1, per_page = 20 ): Promise<Photo[]> => {
  if (!query.trim()) return [];
  try {
    const result = await myaxios.get("/search/photos", {
      params: {query, page,per_page}
    });
    return result.data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};
