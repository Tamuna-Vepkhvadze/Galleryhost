interface ContactInfoType {
  title: string;
  value: string;
  iconUrl: string;
}

interface ContactInfoProps {
  items: ContactInfoType[];
}

const ContactInfo: React.FC<ContactInfoProps> = ({ items }) => (
  <div className="bg-white/30 backdrop-blur-md rounded-xl p-8 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
    <h2 className="text-2xl font-bold text-blue-800 mb-4">Contact Information</h2>
    <p className="text-gray-700 text-lg leading-relaxed mb-6">
      Reach out to collaborate or join our photography community.
    </p>
    {items.map((info, index) => (
      <div key={index} className="flex items-center space-x-4 mb-4">
        <img src={info.iconUrl} alt={info.title} className="w-8 h-8" />
        <div>
          <h3 className="text-gray-600 text-sm font-semibold">{info.title}</h3>
          <p className="text-blue-800 text-lg">{info.value}</p>
        </div>
      </div>
    ))}
  </div>
);

export default ContactInfo;
