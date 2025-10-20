

import StoryCard from "./StoryCard";
import { storyData } from "./storyContent";

const StorySection = () => {
  return (
    <section
      className="min-h-screen flex items-center justify-center bg-cover bg-fixed bg-center relative"
      style={{
        backgroundImage: `url(${storyData.imageUrl})`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <StoryCard title={storyData.title} paragraphs={storyData.paragraphs} />
    </section>
  );
};

export default StorySection;
