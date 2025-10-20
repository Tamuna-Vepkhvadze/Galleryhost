interface SocialMediaType {
  platform: string;
  url: string;
  iconUrl: string;
}

interface SocialMediaLinksProps {
  items: SocialMediaType[];
}

const SocialMediaLinks: React.FC<SocialMediaLinksProps> = ({ items }) => (
  <div className="bg-white/30 backdrop-blur-md rounded-xl p-8 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
    <h2 className="text-2xl font-bold text-blue-800 mb-4">Follow Our Journey</h2>
    <div className="flex space-x-6 justify-center">
      {items.map((social, index) => (
        <a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition duration-300"
        >
          <img src={social.iconUrl} alt={social.platform} className="w-8 h-8" />
        </a>
      ))}
    </div>
  </div>
);

export default SocialMediaLinks;
