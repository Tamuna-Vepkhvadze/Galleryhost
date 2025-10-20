import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import type { Photo } from "../../component/interface/interface";

interface DataProp {
  data: Photo;
}

const DesktopDatailCard: React.FC<DataProp> = ({ data }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // ======= MAIN ACTIONS =======

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = data.urls?.full || data.urls?.regular;
    link.download = "photo.jpg";
    link.click();
    toast.success("📸 Photo downloaded successfully!");
  };

  const handleFavorite = () => {
    toast.info("💜 Added to favorites!");
  };

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  const closeModal = () => {
    setIsShareModalOpen(false);
  };

  // ======= SHARE OPTIONS =======

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      data.urls?.regular || ""
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success("📘 Opening Facebook share...");
  };

  const shareToWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      data.urls?.regular || ""
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success("💬 Sharing via WhatsApp...");
  };

  const shareToOutlook = () => {
    const subject = encodeURIComponent("Check out this amazing photo!");
    const body = encodeURIComponent(
      `I found this awesome photo and wanted to share it with you:\n${data.urls?.regular}`
    );
    const mailto = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = mailto;
    toast.info("📧 Opening Outlook...");
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
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                  <span className="text-2xl font-bold">{data.likes || "0"}</span>
                </div>
                <div className="text-xs text-white/70 mt-1">Likes</div>
              </div>
              <div className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-2xl font-bold">{data.views || "0"}</span>
                </div>
                <div className="text-xs text-white/70 mt-1">Views</div>
              </div>
              <div className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
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
                  <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
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
                onClick={handleDownload}
                className="group flex-1 min-w-[160px] px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download
              </button>

              <button
                onClick={handleFavorite}
                className="group flex-1 min-w-[160px] px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-2xl shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6 group-hover:scale-125 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                Favorite
              </button>

              <button
                onClick={handleShare}
                className="group flex-1 min-w-[160px] px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
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
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="space-y-3">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/50">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
              </div>
              <h2 className="text-3xl font-black text-white">Share this Photo</h2>
              <p className="text-purple-300 text-sm">
                Choose your preferred platform to share this masterpiece
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={shareToFacebook}
                className="group w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Share on Facebook
              </button>

              <button
                onClick={shareToWhatsApp}
                className="group w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-green-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Share on WhatsApp
              </button>

              <button
                onClick={shareToOutlook}
                className="group w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.88 12.04q0 .45-.11.87-.1.41-.33.74-.22.33-.58.52-.37.2-.87.2t-.85-.2q-.35-.21-.57-.55-.22-.33-.33-.75-.1-.42-.1-.86t.1-.87q.1-.43.34-.76.22-.34.59-.54.36-.2.87-.2t.86.2q.35.21.57.55.22.34.31.77.1.43.1.88zM24 12v9.38q0 .46-.33.8-.33.32-.8.32H7.13q-.46 0-.8-.33-.32-.33-.32-.8V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h6.5V2.55q0-.44.3-.75.3-.3.75-.3h12.9q.44 0 .75.3.3.3.3.75V10.85l1.24.72h.01q.1.07.18.18.07.12.07.25zm-6-8.25v3h3v-3zm0 4.5v3h3v-3zm0 4.5v1.83l3.05-1.83zm-5.25-9v3h3.75v-3zm0 4.5v3h3.75v-3zm0 4.5v2.03l2.41 1.5 1.34-.8v-2.73zM9 3.75V6h2l.13.01.12.04v-2.3zM5.98 15.98q.9 0 1.6-.3.7-.32 1.19-.86.48-.55.73-1.28.25-.74.25-1.61 0-.83-.25-1.55-.24-.71-.71-1.24t-1.15-.83q-.68-.3-1.55-.3-.92 0-1.64.3-.71.3-1.2.85-.5.54-.75 1.3-.25.74-.25 1.63 0 .85.26 1.56.26.72.74 1.23.48.52 1.17.81.69.3 1.56.3zM7.5 21h12.39L12 16.08V17q0 .41-.3.7-.29.3-.7.3H7.5zm15-.13v-7.24l-5.9 3.54Z"/>
                </svg>
                Share via Email
              </button>
            </div>
          </div>
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

export default DesktopDatailCard;