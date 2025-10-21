import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import type { Photo } from "../../component/interface/interface";
import favoritesState from "../../../zustand/favoritesState";
import userState from "../../../zustand/userState";
import { useAuthWarning } from "../../component/Hook/useAuthWarning";
import { usePhotoDownload } from "../../component/Hook/usePhotoDownload";

interface DataProp {
  data: Photo;
}

const MobileDetailCard: React.FC<DataProp> = ({ data }) => {
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

  const handleShare = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsShareModalOpen(true);
  };

  const closeModal = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsShareModalOpen(false);
  };

  // ======= SHARE OPTIONS =======
  const { isDownloading, handleDownload } = usePhotoDownload(data);

  // Build a sensible share URL + text fallback
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

  // Share to social network opens a new window with prefilled url/text
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
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span className="text-lg font-bold">{data.likes || "0"}</span>
            </div>
            <div className="text-[10px] text-white/60">Likes</div>
          </div>
          <div className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-3 py-3 text-center">
            <div className="flex items-center justify-center gap-1.5 text-white mb-0.5">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
              </svg>
              <span className="text-lg font-bold">{data.views || "0"}</span>
            </div>
            <div className="text-[10px] text-white/60">Views</div>
          </div>
          <div className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-3 py-3 text-center">
            <div className="flex items-center justify-center gap-1.5 text-white mb-0.5">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
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
              <svg className="w-4 h-4 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8 11c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
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
            onClick={(e) => {
              e.stopPropagation();
              handleDownload(e);
            }}
            className="flex-1 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
            </svg>
            <span className="text-sm">Download</span>
          </button>

          <button
            onClick={handleClick}
            className={`w-14 h-14 rounded-2xl shadow-lg active:scale-95 transition-all flex items-center justify-center ${
              isFavorite(data.id)
                ? "bg-gradient-to-r from-pink-600 to-rose-600 shadow-pink-500/30"
                : "bg-gradient-to-r from-pink-500 to-rose-500 shadow-pink-500/20"
            }`}
          >
            <svg
              className="w-6 h-6 text-white"
              viewBox="0 0 24 24"
              fill={isFavorite(data.id) ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth={isFavorite(data.id) ? 0 : 2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>

          <button
            onClick={handleShare}
            className="w-14 h-14 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-2xl shadow-lg shadow-purple-500/20 active:scale-95 transition-transform flex items-center justify-center"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
            </svg>
          </button>
        </div>
      </div>

      {/* SHARE MODAL */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 animate-fade-in" onClick={closeModal}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

          <div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-t-3xl shadow-2xl animate-slide-up max-h-[85vh] overflow-y-auto p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              <img
                src={data.urls?.small || data.urls?.thumb}
                alt={data.alt_description || "Preview"}
                className="w-20 h-20 object-cover rounded-xl shadow-md flex-shrink-0"
              />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-white">{data.alt_description || "Untitled"}</h4>
                <p className="text-xs text-white/60 mt-1">
                  {data.user?.name ? `By ${data.user.name}` : "Unknown author"}
                </p>
                <p className="text-xs text-white/50 mt-2 line-clamp-3">{shareUrl}</p>
              </div>
              <button
                className="ml-2 text-white/60 text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsShareModalOpen(false);
                }}
              >
                ✕
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                onClick={handleNativeShare}
                className="py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
                </svg>
                Share (device)
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopyLink();
                }}
                className="py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-white font-semibold flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                </svg>
                Copy Link
              </button>

              <button
                onClick={() => handleSocialShare("twitter")}
                className="py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-white font-semibold flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11 1-3.56-.18-6.73-1.89-8.84-4.48-.37.63-.58 1.37-.58 2.16 0 1.49.76 2.81 1.91 3.56-.7-.02-1.36-.21-1.94-.52v.05c0 2.08 1.48 3.82 3.44 4.21-.36.1-.74.15-1.13.15-.28 0-.55-.03-.81-.08.55 1.72 2.14 2.97 4.03 3.01-1.48 1.16-3.34 1.85-5.36 1.85-.35 0-.69-.02-.1-.07 2.03 1.3 4.45 2.06 7.05 2.06 8.47 0 13.11-7.02 13.11-13.11 0-.2 0-.4-.01-.6.9-.65 1.68-1.47 2.3-2.4z" />
                </svg>
                Twitter
              </button>

              <button
                onClick={() => handleSocialShare("facebook")}
                className="py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-white font-semibold flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.91 8-4.94 8-9.95z" />
                </svg>
                Facebook
              </button>

              <button
                onClick={() => handleSocialShare("telegram")}
                className="py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-white font-semibold flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.94 2c5.52 0 10 4.48 10 10s-4.48 10-10 10-10-4.48-10-10S6.42 2 11.94 2zm3.94 15.06l-1.42-4.66 3.12-2.82-5.44-.66L11.94 4l-.66 5.44-2.82-3.12-4.66 1.42 3.94 3.94-3.94 3.94 4.66-1.42 2.82 3.12.66-5.44 5.44.66-3.12 2.82 1.42 4.66-3.94-3.94z" />
                </svg>
                Telegram
              </button>

              <button
                onClick={() => handleSocialShare("email")}
                className="py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-white font-semibold flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
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
                className="col-span-2 py-3 rounded-2xl bg-emerald-600 text-white font-semibold flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                </svg>
                Download Image
              </button>
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={closeModal}
                className="text-xs text-white/60 underline"
              >
                Close
              </button>
            </div>
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
          animation: fade-in 0.18s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.28s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MobileDetailCard;