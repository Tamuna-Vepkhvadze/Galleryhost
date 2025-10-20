import type { Photo } from "../../component/interface/interface";
import DownloadButton from "./DownloadButton";
import FavoriteButton from "./FavoriteButton";


interface Props {
  photo: Photo;
  onClick: () => void;
}

const GalleryPhotoCard = ({ photo, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className="group relative break-inside-avoid cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
      style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
    >
      <img
        src={photo.urls.small}
        alt={photo.alt_description ?? ""}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

     
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      
      <div className="absolute top-3 left-0 right-0 flex justify-between items-start px-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
        <FavoriteButton photo={photo} />
        <DownloadButton photo={photo} />
      </div>

      {photo.alt_description && (
        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <p className="text-white text-sm font-medium line-clamp-2 drop-shadow-lg">
            {photo.alt_description}
          </p>
        </div>
      )}
    </div>
  );
};

export default GalleryPhotoCard;
