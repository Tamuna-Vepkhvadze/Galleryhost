import React from 'react'
import MissionCard from './MissionCard'
import { missionSections } from './missionData'

const Mission = () => {
  return (
    <div className="relative overflow-hidden">
      {missionSections.map((section, index) => (
        <MissionCard
          key={index}
          title={section.title}
          description={section.description}
          imageUrl={section.imageUrl}
        />
      ))}
    </div>
  )
}

export default Mission