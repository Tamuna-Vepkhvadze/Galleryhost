import React, { useEffect} from "react";
import { useSearchParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import EmptyState from "./EmptyState";
import useSearch from "../../component/Hook/useserch";
import GalleryGrid from "../Gallery/GalleriGrid";
import Modal from "../../component/modal/modal";

import useGetPhotoId from "../../component/Hook/useGetPhotoId";
import DetailCard from "../detailePage/DetailCard";

interface SerchPageProps {
  query: string;
  pageprop: string;
}

const SerchPage: React.FC<SerchPageProps> = ({ query, pageprop }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedPhotoId = searchParams.get("photo");
  
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useSearch(pageprop);
  const { data: selectedPhoto } = useGetPhotoId(selectedPhotoId || "", {
    enabled: !!selectedPhotoId,
  });

  useEffect(() => {
    const nextPag = () => {
      const screnHeight = window.innerHeight;
      const scrolPosition = window.scrollY;
      const contentHeigth = document.documentElement.scrollHeight;
      if (screnHeight + scrolPosition >= contentHeigth - 150) {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }
    };
    window.addEventListener("scroll", nextPag);
    return () => window.removeEventListener("scroll", nextPag);
  }, [fetchNextPage, isFetchingNextPage, hasNextPage]);

  const Photos = data?.pages.flat() ?? [];

  const navigateToDetail = (id: string) => {
    setSearchParams({ photo: id });
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading && Photos.length === 0 && <LoadingSpinner />}
        {!isLoading && Photos.length === 0 && query && <EmptyState />}
        {Photos.length > 0 && (
          <GalleryGrid
            isLoading={isLoading}
            navigateToDetail={navigateToDetail}
            photos={Photos}
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

export default SerchPage;