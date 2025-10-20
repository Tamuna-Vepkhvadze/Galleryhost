import { useState } from "react";
import { useVoiceSearch } from "../../component/Hook/useVoiceSearch";
interface Props {
  query: string;
  setQuery: (value: string) => void;
}
const popularTags = ["Nature", "City", "Animals", "Space", "Ocean", "Food"];
const SearchInput = ({ query, setQuery }: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const { isListening, startListening, error } = useVoiceSearch();
  const handleVoiceSearch = () => {
    startListening((spokenText) => setQuery(spokenText));
  };
  return (
   <div className="mt-10 relative w-full max-w-3xl mx-auto">
      <div className="relative group">
        <div
          className={`absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-100 blur transition duration-500 ${
            isFocused ? "opacity-100" : ""
          }`}
        ></div>
        <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
            <svg
              className={`w-5 h-5 transition-all duration-300 ${
                isFocused ? "text-blue-500 scale-110" : "text-gray-400"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          {/* Search Input */}
          <input
            value={query}
            type="text"
            placeholder="Discover amazing photos..."
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full pl-14 pr-16 py-5 rounded-3xl border-2 border-transparent bg-white
                       focus:outline-none focus:border-transparent
                       transition-all duration-300 text-gray-900 placeholder-gray-400 text-lg font-medium"
          />
          {/* :x: Clear button */}
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute inset-y-0 right-10 pr-5 flex items-center text-gray-400 hover:text-red-500
                         transition-all duration-200 hover:scale-110 active:scale-95"
            >
              ✕
            </button>
          )}
          {/* :microphone: Voice Search button */}
          <button
            type="button"
            onClick={handleVoiceSearch}
            className={`absolute inset-y-0 right-0 pr-5 flex items-center transition
              ${isListening ? "text-red-500" : "text-gray-400 hover:text-blue-500"}`}
          >
            {isListening ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 animate-pulse"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
                <path d="M19 10v2a7 7 0 01-14 0v-2H3v2a9 9 0 008 8.94V23h2v-2.06A9 9 0 0021 12v-2z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3zM19 10v2a7 7 0 01-14 0v-2H3v2a9 9 0 008 8.94V23h2v-2.06A9 9 0 0021 12v-2z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      {/* Popular tags */}
      {isFocused && (
        <div className="mt-4 transition-all duration-500 ease-out origin-top">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-4">
              <svg
                className="w-4 h-4 text-purple-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              <span className="text-sm font-semibold text-gray-700">
                Popular Searches
              </span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {popularTags.map((tag, index) => (
                <button
                  key={tag}
                  onMouseDown={() => setQuery(tag)}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className="group relative px-5 py-2.5 rounded-xl font-medium text-sm
                             bg-gradient-to-r from-blue-500 to-purple-500 text-white
                             hover:from-blue-600 hover:to-purple-600
                             transform hover:scale-105 hover:-translate-y-0.5
                             active:scale-95
                             shadow-md hover:shadow-lg
                             transition-all duration-200
                             animate-[fadeInUp_0.5s_ease-out_forwards]
                             opacity-0"
                >
                  <span className="relative z-10">{tag}</span>
                  <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
export default SearchInput;