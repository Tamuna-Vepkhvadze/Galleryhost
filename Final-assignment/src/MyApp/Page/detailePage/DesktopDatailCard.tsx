
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

const DesktopDetailCard: React.FC<DataProp> = ({ data }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const { showWarning } = useAuthWarning();
  const { isAuthenticated } = userState();
  const { addFavorite, removeFavorite, isFavorite } = favoritesState();
  const { isDownloading, handleDownload } = usePhotoDownload(data);

  // ======= MAIN ACTIONS =======
  const handleFavorite = (e: React.MouseEvent) => {
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

  const handleShare = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsShareModalOpen(true);
  };

  const closeModal = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsShareModalOpen(false);
  };

  // ======= SHARE OPTIONS =======
  const shareUrl = (() => {
    return data.links?.html || data.urls?.regular || window.location.href;
  })();

  const shareText = data.alt_description || data.description || "Check out this photo";

  // Native share (Web Share API)
  const handleNativeShare = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: data.user?.name || "Photo",
          text: shareText,
          url: shareUrl,
        });
        toast.success("Shared successfully");
      } catch (err: any) {
        if (err.name !== "AbortError") {
          toast.error("Unable to share on this device");
        }
      } finally {
        setIsShareModalOpen(false);
      }
    } else {
      toast.info("Native sharing is not supported on this device");
      setIsShareModalOpen(false);
    }
  };

  // Copy link to clipboard
  const handleCopyLink = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard");
      setIsShareModalOpen(false);
    } catch (err) {
      toast.error("Copy failed — try manually");
      setIsShareModalOpen(false);
    }
  };

  // Share to social network
  const handleSocialShare = (provider: "twitter" | "facebook" | "telegram" | "email") => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(shareText + (data.user?.name ? ` — by ${data.user.name}` : ""));
    let url = "";

    switch (provider) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "telegram":
        url = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
        break;
      case "email":
        url = `mailto:?subject=${encodeURIComponent("Check out this photo")}&body=${encodedText}%0A${encodedUrl}`;
        break;
      default:
        url = encodedUrl;
    }

    window.open(url, "_blank", "noopener,noreferrer,width=600,height=450");
    setIsShareModalOpen(false);
  };

  // ======= UI =======
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex justify-center items-center py-12 px-4">
      <div className="max-w-5xl w-full">
        <div className="bg-gradient-to-br from-slate-900/90 to-purple-900/40 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_80px_rgba(139,92,246,0.3)] overflow-hidden border border-purple-500/20 transition-all duration-500 hover:shadow-[0_30px_100px_rgba(139,92,246,0.4)] hover:scale-[1.01]">
          {/* IMAGE */}
          <div className="relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 mix-blend-overlay z-10"></div>
            <img
              src={data.urls?.regular}
              alt={data.alt_description || "Photo"}
              className="w-full h-[550px] object-cover transition-all duration-700 group-hover:scale-110 brightness-90 group-hover:brightness-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60 z-20" />

            {/* Floating Stats Overlay */}
            <div className="absolute bottom-6 left-6 right-6 z-30 flex gap-3">
              <div className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-white">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <span className="text-2xl font-bold">{data.likes || "0"}</span>
                </div>
                <div className="text-xs text-white/70 mt-1">Likes</div>
              </div>
              <div className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-white">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                  </svg>
                  <span className="text-2xl font-bold">{data.views || "0"}</span>
                </div>
                <div className="text-xs text-white/70 mt-1">Views</div>
              </div>
              <div className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-white">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                  </svg>
                  <span className="text-2xl font-bold">{data.downloads || "0"}</span>
                </div>
                <div className="text-xs text-white/70 mt-1">Downloads</div>
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="p-10 space-y-8">
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 leading-tight tracking-tight">
              {data.alt_description || "Untitled Masterpiece"}
            </h1>

            {/* AUTHOR */}
            <div className="flex items-center gap-5 pb-6 border-b border-purple-500/20">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-purple-500/50">
                  {data.user?.name?.charAt(0) || "?"}
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-slate-900"></div>
              </div>
              <div>
                <p className="text-sm text-purple-300 font-medium tracking-wide">Created by</p>
                <p className="text-xl font-bold text-white">
                  {data.user?.name || "Unknown Artist"}
                </p>
              </div>
            </div>

            {/* TAGS */}
            {data.tags && data.tags.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8 11c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                  </svg>
                  <h3 className="text-sm font-bold text-purple-300 uppercase tracking-widest">
                    Popular Tags
                  </h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {data.tags.slice(0, 6).map((tag: any, i: number) => (
                    <span
                      key={i}
                      className="px-5 py-2.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-purple-400/30 text-purple-200 text-sm font-semibold rounded-full hover:from-purple-500/30 hover:to-pink-500/30 hover:border-purple-400/50 hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg shadow-purple-500/10"
                    >
                      #{tag.title}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap gap-4 pt-8">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload(e);
                }}
                className="group flex-1 min-w-[160px] px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6 group-hover:animate-bounce" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                </svg>
                Download
              </button>

              <button
                onClick={handleFavorite}
                className="group flex-1 min-w-[160px] px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-2xl shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <svg
                  className="w-6 h-6 group-hover:scale-125 transition-transform"
                  viewBox="0 0 24 24"
                  fill={isFavorite(data.id) ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth={isFavorite(data.id) ? 0 : 2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                {isFavorite(data.id) ? "Unfavorite" : "Favorite"}
              </button>

              <button
                onClick={handleShare}
                className="group flex-1 min-w-[160px] px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
                </svg>
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SHARE MODAL */}
      {isShareModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50 animate-fade-in">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-3xl shadow-2xl shadow-purple-500/30 p-10 max-w-md w-full space-y-8 text-center relative border border-purple-500/30 animate-scale-up">
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:rotate-90"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="space-y-3">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/50">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
                </svg>
              </div>
              <h2 className="text-3xl font-black text-white">Share this Photo</h2>
              <p className="text-purple-300 text-sm">
                Choose your preferred platform to share this masterpiece
              </p>
              <img
                src={data.urls?.small || data.urls?.thumb}
                alt={data.alt_description || "Preview"}
                className="w-20 h-20 mx-auto object-cover rounded-xl shadow-md"
              />
              <p className="text-xs text-white/50 line-clamp-3">{shareUrl}</p>
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={handleNativeShare}
                className="group w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
                </svg>
                Share (device)
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopyLink();
                }}
                className="group w-full py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-white/30 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                </svg>
                Copy Link
              </button>

              <button
                onClick={() => handleSocialShare("twitter")}
                className="group w-full py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-white/30 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11 1-3.56-.18-6.73-1.89-8.84-4.48-.37.63-.58 1.37-.58 2.16 0 1.49.76 2.81 1.91 3.56-.7-.02-1.36-.21-1.94-.52v.05c0 2.08 1.48 3.82 3.44 4.21-.36.1-.74.15-1.13.15-.28 0-.55-.03-.81-.08.55 1.72 2.14 2.97 4.03 3.01-1.48 1.16-3.34 1.85-5.36 1.85-.35 0-.69-.02-.1-.07 2.03 1.3 4.45 2.06 7.05 2.06 8.47 0 13.11-7.02 13.11-13.11 0-.2 0-.4-.01-.6.9-.65 1.68-1.47 2.3-2.4z" />
                </svg>
                Twitter
              </button>

              <button
                onClick={() => handleSocialShare("facebook")}
                className="group w-full py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-white/30 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>

              <button
                onClick={() => handleSocialShare("telegram")}
                className="group w-full py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-white/30 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.94 2c5.52 0 10 4.48 10 10s-4.48 10-10 10-10-4.48-10-10S6.42 2 11.94 2zm3.94 15.06l-1.42-4.66 3.12-2.82-5.44-.66L11.94 4l-.66 5.44-2.82-3.12-4.66 1.42 3.94 3.94-3.94 3.94 4.66-1.42 2.82 3.12.66-5.44 5.44.66-3.12 2.82 1.42 4.66-3.94-3.94z" />
                </svg>
                Telegram
              </button>

              <button
                onClick={() => handleSocialShare("email")}
                className="group w-full py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-white/30 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                Email
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload(e);
                  setIsShareModalOpen(false);
                }}
                className="group w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6 group-hover:animate-bounce" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                </svg>
                Download Image
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FULLSCREEN LOADING SPINNER */}
      {isDownloading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-24 h-24 border-4 border-t-emerald-500 border-r-emerald-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <ToastContainer position="bottom-center" autoClose={2000} />

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-up {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-scale-up {
          animation: scale-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default DesktopDetailCard;