
import Mission from '../Mission/Mission';
import StatsSection from '../Stats/StatsSection';
import StorySection from '../Stor/StorySection';



const About = () => {
  return (
    <section
      className="min-h-screen bg-cover bg-fixed bg-center relative flex flex-col"
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1444628838545-ac4016a5418a?auto=format&fit=crop&w=1920&q=80)`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 container mx-auto px-6 lg:px-12 py-16 flex flex-col items-center">
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
            About Our Vision
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            We are a global community dedicated to celebrating authentic photography, connecting creators, and inspiring visual storytelling.
          </p>
        </div>
        <div className=" w-full">
          <StatsSection />
          <StorySection />
          <Mission />
        </div>
      </div>
    </section>
  );
};



export default About;