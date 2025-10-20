import type { Photo } from "../../component/interface/interface";


interface Props {
  photo: Photo
  index: number
 
}

const PhotoCard: React.FC<Props> = ({ photo, index}) => {
 return (
            <div
              key={`${photo.id}-${index}`}
           
              className="group relative break-inside-avoid cursor-pointer overflow-hidden rounded-xl shadow-lg 
                         hover:shadow-2xl transition-all duration-300"
              style={{ 
                aspectRatio: `${photo.width} / ${photo.height}`,
              }}
            >
              
              <img 
                src={photo.urls.small} 
                alt={photo.alt_description ?? ""} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
             
              <div className="absolute top-3 left-0 right-0 flex justify-between items-start px-3 
                              opacity-0 group-hover:opacity-100 transition-all duration-300 transform 
                              -translate-y-2 group-hover:translate-y-0">
              
                <button
                  
                  className="p-2.5 rounded-full bg-white/90 backdrop-blur-sm shadow-lg 
                             hover:bg-white hover:scale-110 active:scale-95 transition-all duration-200"
                  aria-label="Like photo"
                >
                  <svg 
                    className={`w-5 h-5 transition-colors duration-200 `}
                  
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
                
               
                <button
                  
                  className="p-2.5 rounded-full bg-white/90 backdrop-blur-sm shadow-lg 
                             hover:bg-white hover:scale-110 active:scale-95 transition-all duration-200"
                  aria-label="Download photo"
                >
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
                </button>
              </div>
              
             
              {photo.alt_description && (
                <div className="absolute bottom-0 left-0 right-0 p-4 
                                opacity-0 group-hover:opacity-100 transition-all duration-300 transform 
                                translate-y-2 group-hover:translate-y-0">
                  <p className="text-white text-sm font-medium line-clamp-2 drop-shadow-lg">
                    {photo.alt_description}
                  </p>
                </div>
              )}
            </div>
          );
        }

export default PhotoCard
