import type { Photo } from "../../component/interface/interface";
import ElectricLoading from "../../component/Loader/ElectricLoading";

import GalleryPhotoCard from "./GalleryPhotoCard";


interface Props {
  photos: Photo[];
  isLoading: boolean;
  navigateToDetail: (id: string) => void;
}

const GalleryGrid = ({ photos, isLoading, navigateToDetail }: Props) => {
  return (
    <div className="p-4">
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {photos.map((photo,index) => (
          <GalleryPhotoCard
            key={`${photo.id}${index}`}
            photo={photo}
            onClick={() => navigateToDetail(photo.id)}
          />
        ))}
      </div>

      {isLoading && photos.length === 0 && <ElectricLoading />}
    </div>
  );
};

export default GalleryGrid;
