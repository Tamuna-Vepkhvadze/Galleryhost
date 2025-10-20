

import React from "react";

interface StatsCardProps {
  title: string;
  count: number;
  suffix?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, count, suffix }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-center border border-white/20 group hover:bg-white/20 transition-all duration-300">
      <h3 className="text-3xl font-bold text-white mb-2">
        {count}{suffix}
      </h3>
      <p className="text-gray-200 text-sm uppercase tracking-wider">{title}</p>
    </div>
  );
};

export default StatsCard;
