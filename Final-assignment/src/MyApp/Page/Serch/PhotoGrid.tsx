import type { Photo } from "../../component/interface/interface";
import GalleryGrid from "../Gallery/GalleriGrid";

interface Props {
  direction: (id: string) => void;
  photos?: Photo[];
  page: number;
  setPage: (page: number) => void;
  hasMore?: boolean;    
  isLoading?: boolean;   
}

const PhotoGrid = ({ photos = [], direction, page, setPage, hasMore = false, isLoading = false }: Props) => {
  if (!Array.isArray(photos) || photos.length === 0) {
    return <p className="text-center text-gray-500 py-8">No photos found.</p>;
  }

  return (
    <div >
      <GalleryGrid isLoading={isLoading} navigateToDetail={direction} photos={photos}/>

      {hasMore && (
        <button
          onClick={() => !isLoading && setPage(page + 1)}
          disabled={isLoading}
          className={`mx-auto col-span-full flex justify-center py-4 px-8 mt-7 mb-5 rounded-lg transition
                      ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
        >
          {isLoading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default PhotoGrid;
