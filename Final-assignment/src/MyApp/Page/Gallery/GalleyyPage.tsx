
import { useEffect, useState } from "react";
import Modal from "../../component/modal/modal";
import useGetPhotoId from "../../component/Hook/useGetPhotoId";
import type { Photo } from "../../component/interface/interface";
import GalleryGrid from "./GalleriGrid";
import useGetGallery from "../../component/Hook/useGetGallery";
import DetailCard from "../detailePage/DetailCard";

const GalleyyPage: React.FC = () => {
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetGallery();
  const { data: selectedPhoto } = useGetPhotoId(selectedPhotoId || "", {
    enabled: !!selectedPhotoId,
  });
  
  const gallery: Photo[] = data?.pages.flat() ?? [];


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

  return (
    <>
      <GalleryGrid
        isLoading={isLoading}
        navigateToDetail={(id) => setSelectedPhotoId(id)} 
        photos={gallery}
      />

      {selectedPhotoId && (
        <Modal 
          isclose={() => setSelectedPhotoId(null)} 
          isopen={!!selectedPhotoId}
        >
          {selectedPhoto && <DetailCard data={selectedPhoto} />}
        </Modal>
      )}
    </>
  );
};

export default GalleyyPage