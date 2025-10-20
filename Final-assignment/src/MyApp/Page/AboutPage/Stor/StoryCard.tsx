

interface StoryCardProps {
  title: string;
  paragraphs: string[];
}

const StoryCard: React.FC<StoryCardProps> = ({ title, paragraphs }) => {
  return (
    <div className="relative z-10 text-center px-8 max-w-2xl animate-fadeIn">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-wide">
        {title}
      </h2>
      {paragraphs.map((p, i) => (
        <p key={i} className="text-lg md:text-xl text-gray-200 leading-loose mb-4 last:mb-0">
          {p}
        </p>
      ))}
    </div>
  );
};

export default StoryCard;
