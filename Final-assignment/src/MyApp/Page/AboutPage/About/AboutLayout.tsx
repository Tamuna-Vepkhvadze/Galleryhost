

import Mission from "../Mission/Mission";
import StatsSection from "../Stats/StatsSection";
import StorySection from "../Stor/StorySection";

const AboutLayout = () => {
  return (
    <main className="container mx-auto px-6 lg:px-12 py-16 flex flex-col gap-24">
      <StatsSection />
      <StorySection />
      <Mission />
    </main>
  );
};

export default AboutLayout;
