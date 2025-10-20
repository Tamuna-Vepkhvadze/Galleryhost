

import { useEffect, useState } from "react";
import StatsCard from "./StatsCard";
import { stats } from "./statsData";

const StatsSection = () => {
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));

  useEffect(() => {
    const timers = stats.map((stat, index) => {
      const increment = stat.value / 50;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(timer);
        }
        setCounts((prev) => {
          const updated = [...prev];
          updated[index] = Math.floor(current);
          return updated;
        });
      }, 30);
      return timer;
    });

    return () => timers.forEach(clearInterval);
  }, []);

  return (
    <section
      className="min-h-screen flex items-center justify-center bg-cover bg-fixed bg-center relative"
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80)`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-6 px-8 max-w-5xl">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            count={counts[index]}
            suffix={stat.suffix}
          />
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
