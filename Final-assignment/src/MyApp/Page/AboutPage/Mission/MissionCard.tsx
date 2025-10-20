

import React from "react";
import type { MissionSectionType } from "./missionData";


const MissionCard: React.FC<MissionSectionType> = ({ title, description, imageUrl }) => {
  return (
    <section
      className="min-h-screen flex items-center justify-center bg-cover bg-fixed bg-center relative"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 text-center px-8 max-w-3xl">
        <h3 className="text-4xl font-bold text-white mb-6 tracking-wide">{title}</h3>
        <p className="text-xl text-gray-200 leading-loose">{description}</p>
      </div>
    </section>
  );
};

export default MissionCard;
