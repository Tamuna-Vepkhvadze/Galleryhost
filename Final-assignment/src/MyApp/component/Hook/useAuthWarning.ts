import { toast } from "react-toastify";

export const useAuthWarning = () => {
  const showWarning = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    toast.info("⚠️ Please authorize to use the service.")
    
   
  };
  return { showWarning };
};
