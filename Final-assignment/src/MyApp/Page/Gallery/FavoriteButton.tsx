import { toast } from "react-toastify";
import favoritesState from "../../../zustand/favoritesState";
import userState from "../../../zustand/userState";
import { useAuthWarning } from "../../component/Hook/useAuthWarning";
import type { Photo } from "../../component/interface/interface";


interface Props {
  photo: Photo;
}

const FavoriteButton = ({ photo }: Props) => {
  const { isAuthenticated } = userState();
  const { addFavorite, removeFavorite, isFavorite } = favoritesState();
  const { showWarning } = useAuthWarning();

 const handleClick = (e: React.MouseEvent) => {
  e.stopPropagation();
  if (!isAuthenticated) return showWarning(e);

  if (isFavorite(photo.id)) {
    removeFavorite(photo.id);
    toast.info("Successfully removed from favorites");
  } else {
    addFavorite(photo);
    toast.success("Successfully added to favorites");
  }
};

  return (
    <button
      onClick={handleClick}
      className="p-2.5 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white hover:scale-110 active:scale-95 transition-all duration-200"
    >
      <svg
        className={`w-5 h-5 ${
          isFavorite(photo.id) ? "text-red-500 fill-red-500" : "text-gray-700"
        } transition-colors duration-200`}
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
};

export default FavoriteButton;
