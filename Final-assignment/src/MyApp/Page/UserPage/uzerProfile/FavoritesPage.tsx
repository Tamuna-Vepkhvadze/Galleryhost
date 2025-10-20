import { useSearchParams } from "react-router-dom";
import favoritesState from "../../../../zustand/favoritesState";
import GalleryGrid from "../../Gallery/GalleriGrid";
import useGetPhotoId from "../../../component/Hook/useGetPhotoId";
import Modal from "../../../component/modal/modal";
import DetailCard from "../../detailePage/DetailCard";


const FavoritesPage = () => {
  const { favorites } = favoritesState();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedPhotoId = searchParams.get("photo");
  
  const { data: selectedPhoto } = useGetPhotoId(selectedPhotoId || "", {
    enabled: !!selectedPhotoId,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Favorites
          </h1>
          <p className="text-gray-600 text-lg">
            Your selected pictures
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-rose-100 to-purple-100 flex items-center justify-center">
              <svg 
                className="w-12 h-12 text-rose-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              You don’t have any favorites yet.
            </h2>
            <p className="text-gray-500 text-center max-w-md">
              Add the pictures you like and they will appear here.
            </p>
          </div>
        ) : (
          <GalleryGrid
            photos={favorites}
            isLoading={false}
            navigateToDetail={(id) => setSearchParams({ photo: id })}
          />
        )}
      </div>

      {selectedPhotoId && (
        <Modal 
          isclose={() => setSearchParams({})} 
          isopen={!!selectedPhotoId}
        >
          {selectedPhoto && <DetailCard data={selectedPhoto} />}
        </Modal>
      )}
    </div>
  );
};

export default FavoritesPage;