import { useState } from "react";

import { useAuthWarning } from "./useAuthWarning";
import type { Photo } from "../interface/interface";
import userState from "../../../zustand/userState";
import { downloadPhoto } from "../../Service/ReactQuery/Query/downloadPhoto";


export const usePhotoDownload = (photo: Photo) => {
  const { isAuthenticated } = userState();
  const { showWarning } = useAuthWarning();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) return showWarning(e);

    try {
      setIsDownloading(true);
      await downloadPhoto(photo);
    } finally {
      setIsDownloading(false);
    }
  };

  return { isDownloading, handleDownload };
};
