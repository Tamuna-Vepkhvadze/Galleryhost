
import { usePhotoDownload } from "../../component/Hook/usePhotoDownload";
import type { Photo } from "../../component/interface/interface";


interface Props {
  photo: Photo;
}

const DownloadButton = ({ photo }: Props) => {
  const { isDownloading, handleDownload } = usePhotoDownload(photo);

  return (
    <button
      onClick={handleDownload}
      className="p-2.5 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white hover:scale-110 active:scale-95 transition-all duration-200 relative"
      disabled={isDownloading}
    >
      {isDownloading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <svg
          className="w-5 h-5 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
      )}
    </button>
  );
};

export default DownloadButton;
