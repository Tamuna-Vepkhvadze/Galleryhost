import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import RegisterButton from "./RegisterButton";
import UserMenu from "./UserMenu";
import userState from "../../../zustand/userState";
import Navigation from "./Nvigation";

const Header = () => {
  const { user } = userState();
  const [menuOpen, setMenuOpen] = useState(false);
const menuRef = useRef<HTMLDivElement | null>(null);
const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event:MouseEvent) => {
      const target = event.target as Node | null;
      
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <>
      <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-700 shadow-2xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Logo />

          {/* Desktop Navigation + RegisterButton - უცვლელი */}
          <div className="hidden md:flex items-center gap-6">
            <Navigation />
            <RegisterButton />
          </div>

          {/* Mobile Menu Button - თანამედროვე სტილი */}
          <div className="md:hidden">
            {user ? (
              <UserMenu />
            ) : (
              <button
                ref={buttonRef}
                onClick={toggleMenu}
                className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                aria-label="Toggle Menu"
              >
                <div className="relative w-5 h-4 flex flex-col justify-between">
                  <span
                    className={`w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-300 ${
                      menuOpen ? "rotate-45 translate-y-1.5" : ""
                    }`}
                  ></span>
                  <span
                    className={`w-full h-0.5 bg-gradient-to-r from-pink-400 to-cyan-400 rounded-full transition-all duration-300 ${
                      menuOpen ? "opacity-0" : ""
                    }`}
                  ></span>
                  <span
                    className={`w-full h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full transition-all duration-300 ${
                      menuOpen ? "-rotate-45 -translate-y-1.5" : ""
                    }`}
                  ></span>
                </div>
              </button>
            )}
          </div>
        </div>

        <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500"></div>
      </header>

      {/* Mobile Menu - ულტრა თანამედროვე სტილი */}
      <div className="md:hidden bg-transparent">
        <div className="flex justify-center">
          {menuOpen && (
            <div
              ref={menuRef}
              className="w-full max-w-md backdrop-blur-2xl bg-slate-900/95 px-6 pb-8 pt-6 flex flex-col space-y-4 border-x border-b border-white/5 shadow-2xl animate-[slideDown_0.3s_ease-out]"
            >
              {/* Nav items - თანამედროვე ეფექტებით */}
              <div className="flex flex-col space-y-3">
                <Link
                  to="/"
                  className="group relative w-full text-center px-6 py-3.5 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                  onClick={() => setMenuOpen(false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 border border-white/5 group-hover:border-white/20 rounded-xl transition-all duration-300"></div>
                  <span className="relative z-10">Home</span>
                </Link>
                <Link
                  to="/About"
                  className="group relative w-full text-center px-6 py-3.5 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                  onClick={() => setMenuOpen(false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 border border-white/5 group-hover:border-white/20 rounded-xl transition-all duration-300"></div>
                  <span className="relative z-10">About</span>
                </Link>
                <Link
                  to="/ContactPage"
                  className="group relative w-full text-center px-6 py-3.5 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                  onClick={() => setMenuOpen(false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 border border-white/5 group-hover:border-white/20 rounded-xl transition-all duration-300"></div>
                  <span className="relative z-10">Contact</span>
                </Link>
              </div>

              {/* Register/Login - თანამედროვე დიზაინი */}
              {!user && (
                <div className="flex flex-col space-y-3 mt-4 pt-4 border-t border-white/10">
                  <Link
                    to="/uzerRegistration"
                    className="group relative w-full text-center px-6 py-3.5 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-purple-500/50 hover:scale-[1.02]"
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <span className="relative z-10 tracking-wide">Register</span>
                  </Link>
                  <Link
                    to="/Login"
                    className="group relative w-full text-center px-6 py-3.5 text-white font-bold rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 border-2 border-violet-600 rounded-xl group-hover:border-transparent transition-all duration-300"></div>
                    <span className="relative z-10 bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent group-hover:text-white tracking-wide">Login</span>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* ჩამოსაშლელი ისრები (User Arrow Button) - მხოლოდ ავტორიზებული მომხმარებლებისთვის */}
        {user && (
          <div className="flex justify-center pt-4 pb-2">
            <button
              ref={buttonRef}
              onClick={toggleMenu}
              className="group relative p-3 transition-all duration-300 hover:scale-110 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {/* Pulsing ring effect */}
              <div className={`absolute inset-0 rounded-full border-2 border-purple-500/30 ${menuOpen ? 'scale-0' : 'animate-[ping_2s_ease-in-out_infinite]'}`}></div>
              
              {/* Click hint text */}
              {!menuOpen && (
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="text-xs font-medium text-purple-400/70 animate-[pulse_2s_ease-in-out_infinite]">
                    Click to open menu
                  </span>
                </div>
              )}
              
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 32 48"
                strokeWidth="2"
                className={`w-16 h-16 transition-all duration-700 ${menuOpen ? 'rotate-180' : ''}`}
              >
                <defs>
                  <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#334155" />
                    <stop offset="100%" stopColor="#334155" />
                  </linearGradient>
                  
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 8l10 10 10-10"
                  stroke="url(#arrowGradient)"
                  filter="url(#glow)"
                  className={`${menuOpen ? 'opacity-100' : 'animate-[float_3s_ease-in-out_infinite]'}`}
                />
                {!menuOpen && (
                  <>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 20l10 10 10-10"
                      stroke="url(#arrowGradient)"
                      filter="url(#glow)"
                      style={{ animationDelay: '0.6s' }}
                      className="animate-[float_3s_ease-in-out_infinite] opacity-80"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 32l10 10 10-10"
                      stroke="url(#arrowGradient)"
                      filter="url(#glow)"
                      style={{ animationDelay: '1.2s' }}
                      className="animate-[float_3s_ease-in-out_infinite] opacity-60"
                    />
                  </>
                )}
              </svg>
            </button>
          </div>
        )}
      </div>

      <style >{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
            opacity: 1;
          }
          50% {
            transform: translateY(-8px);
            opacity: 0.3;
          }
        }
      `}</style>
    </>
  );
};

export default Header;