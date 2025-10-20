const LoadingText = () => (
  <h1
    className="text-5xl md:text-7xl font-black mb-4"
    style={{
      background: 'linear-gradient(135deg, #22d3ee, #a78bfa, #ec4899)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      textShadow: '0 0 40px rgba(139, 92, 246, 0.5)',
      animation: 'pulse 2s ease-in-out infinite'
    }}
  >
    Loading
  </h1>
);

export default LoadingText;
