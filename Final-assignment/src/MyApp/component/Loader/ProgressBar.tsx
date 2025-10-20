interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => (
  <div className="max-w-md mx-auto">
    <div
      className="h-2 rounded-full backdrop-blur-xl bg-slate-900/60 border overflow-hidden"
      style={{
        borderColor: 'rgba(139, 92, 246, 0.3)',
        boxShadow: '0 0 20px rgba(139, 92, 246, 0.2)'
      }}
    >
      <div
        className="h-full rounded-full transition-all duration-300"
        style={{
          width: `${Math.min(progress, 100)}%`,
          background: 'linear-gradient(90deg, #06b6d4, #8b5cf6, #ec4899)',
          boxShadow: '0 0 20px rgba(139, 92, 246, 0.8), 0 0 10px rgba(6, 182, 212, 0.6)'
        }}
      />
    </div>

    <div className="mt-4 text-gray-400 text-sm font-medium">
      {Math.min(Math.round(progress), 100)}% მუშავდება...
    </div>
  </div>
);

export default ProgressBar;
