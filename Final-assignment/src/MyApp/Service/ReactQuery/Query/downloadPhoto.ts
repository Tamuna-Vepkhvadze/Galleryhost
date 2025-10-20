import { toast } from "react-toastify";
import type { Photo } from "../../../component/interface/interface";
import { myaxios } from "../../axios/axios";
export const downloadPhoto = async (photo: Photo) => {
  try {
    await myaxios.get(photo.links.download_location);
    const response = await fetch(photo.urls.full);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${photo.id}.jpg`;
    link.click();
    window.URL.revokeObjectURL(url);
    toast.success(" Downloaded successfully");
  } catch (error) {
    console.error(" Download failed:", error);
    toast.error("❌Download error");
  }
};
