const Logo = () => {
  return (
    <div className="flex items-center space-x-2 md:space-x-3 group">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
        <div className="relative bg-white p-1.5 md:p-2 rounded-lg shadow-lg transform group-hover:scale-110 transition duration-300">
          <svg className="w-6 h-6 md:w-10 md:h-10" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#grad1)" className="animate-pulse" />
            <path d="M2 17L12 22L22 17" stroke="url(#grad2)" strokeWidth="2" strokeLinecap="round" />
            <path d="M2 12L12 17L22 12" stroke="url(#grad3)" strokeWidth="2" strokeLinecap="round" />
            <defs>
              <linearGradient id="grad1" x1="2" y1="7" x2="22" y2="7">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
              <linearGradient id="grad2" x1="2" y1="17" x2="22" y2="17">
                <stop offset="0%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
              <linearGradient id="grad3" x1="2" y1="12" x2="22" y2="12">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <span className="text-lg md:text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
        MyGallery
      </span>
    </div>
  );
};

export default Logo;