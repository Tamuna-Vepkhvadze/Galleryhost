
import { useNavigate } from 'react-router-dom';
const ErrorPage404 = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gray-900 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-8xl font-bold text-red-500 mb-6 animate-pulse">
        404
      </h1>
      <h2 className="text-2xl md:text-4xl text-white font-bold mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-400 mb-8">The page you are looking for doesn’t exist or has been moved.</p>
      <button
        type="button"
        onClick={() => navigate('/')}
        className="relative z-10 px-8 py-3 cursor-pointer bg-red-500 text-white font-semibold rounded-lg hover:bg-red-400 transition-colors duration-300"
      >
        Back to Home
      </button>
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute text-green-400 font-mono text-xs"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `matrixFall ${5 + Math.random() * 5}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            {Math.random().toString(36).substring(7)}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes matrixFall {
          0% { transform: translateY(-100vh); opacity: 0; }
          10% { opacity: 0.3; }
          90% { opacity: 0.3; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
export default ErrorPage404;