import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import type { Photo } from "../../component/interface/interface";
import favoritesState from "../../../zustand/favoritesState";
import userState from "../../../zustand/userState";
import { useAuthWarning } from "../../component/Hook/useAuthWarning";
import { usePhotoDownload } from "../../component/Hook/usePhotoDownload";

interface DataProp {
  data: Photo;
}

const MobailDatailCard: React.FC<DataProp> = ({ data }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const { showWarning } = useAuthWarning();
  const { isAuthenticated } = userState();
  const { addFavorite, removeFavorite, isFavorite } = favoritesState();
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) return showWarning(e);

    if (isFavorite(data.id)) {
      removeFavorite(data.id);
      toast.info("Successfully removed from favorites");
    } else {
      addFavorite(data);
      toast.success("Successfully added to favorites");
    }
  };

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  const closeModal = () => {
    setIsShareModalOpen(false);
  };

  // ======= SHARE OPTIONS =======


  const { isDownloading, handleDownload } = usePhotoDownload(data);

  // ======= UI =======
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-neutral-900 to-stone-900">
      {/* IMAGE with Overlay Stats */}
      <div className="relative">
        <img
          src={data.urls?.regular}
          alt={data.alt_description || "Photo"}
          className="w-full h-[60vh] object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/30 to-transparent"></div>
        
        {/* Floating Stats */}
        <div className="absolute bottom-4 left-4 right-4 flex gap-2">
          <div className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-3 py-3 text-center">
            <div className="flex items-center justify-center gap-1.5 text-white mb-0.5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
              <span className="text-lg font-bold">{data.likes || "0"}</span>
            </div>
            <div className="text-[10px] text-white/60">Likes</div>
          </div>
          <div className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-3 py-3 text-center">
            <div className="flex items-center justify-center gap-1.5 text-white mb-0.5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              <span className="text-lg font-bold">{data.views || "0"}</span>
            </div>
            <div className="text-[10px] text-white/60">Views</div>
          </div>
          <div className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-3 py-3 text-center">
            <div className="flex items-center justify-center gap-1.5 text-white mb-0.5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span className="text-lg font-bold">{data.downloads || "0"}</span>
            </div>
            <div className="text-[10px] text-white/60">Downloads</div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-5 pt-6 pb-24">
        <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 leading-tight mb-6">
          {data.alt_description || "Untitled Masterpiece"}
        </h2>

        {/* Author Card */}
        <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl mb-6">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-500/30">
              {data.user?.name?.charAt(0) || "?"}
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-zinc-900"></div>
          </div>
          <div className="flex-1">
            <p className="text-xs text-purple-300 font-medium">Created by</p>
            <p className="text-base font-bold text-white">
              {data.user?.name || "Unknown Artist"}
            </p>
          </div>
        </div>

        {/* Tags Section */}
        {data.tags && data.tags.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              <h3 className="text-xs font-bold text-purple-300 uppercase tracking-widest">
                Popular Tags
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.tags.slice(0, 6).map((tag: any, i: number) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-purple-400/30 text-purple-200 text-xs font-semibold rounded-full active:scale-95 transition-transform"
                >
                  #{tag.title}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-zinc-900/95 backdrop-blur-xl border-t border-white/10 px-4 py-4 pb-6">
        <div className="flex gap-3">
          <button
            onClick={handleDownload}
            className="flex-1 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Download</span>
          </button>

          <button
            onClick={handleClick}
            className={`w-14 h-14 rounded-2xl shadow-lg active:scale-95 transition-all flex items-center justify-center ${
              isFavorite(data.id) 
                ? 'bg-gradient-to-r from-pink-600 to-rose-600 shadow-pink-500/30' 
                : 'bg-gradient-to-r from-pink-500 to-rose-500 shadow-pink-500/20'
            }`}
          >
            <svg 
              className="w-6 h-6 text-white" 
              fill={isFavorite(data.id) ? "currentColor" : "none"} 
              stroke="currentColor" 
              strokeWidth={isFavorite(data.id) ? 0 : 2} 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          <button
            onClick={handleShare}
            className="w-14 h-14 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-2xl shadow-lg shadow-purple-500/20 active:scale-95 transition-transform flex items-center justify-center"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
          </button>
        </div>
      </div>

      {/* SHARE MODAL */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 animate-fade-in">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-t-3xl shadow-2xl animate-slide-up max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* modal content... same as before */}
          </div>
        </div>
      )}

      {/* ===== FULLSCREEN LOADING SPINNER ===== */}
      {isDownloading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-24 h-24 border-4 border-t-emerald-500 border-r-emerald-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <ToastContainer position="bottom-center" autoClose={2000} />

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MobailDatailCard;
