import { useState, useEffect } from 'react';
import LoadingText from './LoadingText';
import ProgressBar from './ProgressBar';

export default function ElectricLoading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 0;
        return prev + Math.random() * 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-black overflow-hidden flex items-center justify-center">
      <div className="relative z-10 text-center px-6">
        <div className="mb-8">
          <LoadingText />
        </div>
        <ProgressBar progress={progress} />
      </div>
    </div>
  );
}
