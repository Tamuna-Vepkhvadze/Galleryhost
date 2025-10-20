import ContactForm from "./ContactForm";
import { contactInfo } from "./contactInfo";
import ContactInfocard from "./ContactInfocard";
import { socialMedia } from "./socialMedia";
import SocialMediaLinks from "./SocialMediaLinks";

const ContactPage = () => {
  const handleFormSubmit = (data: { name: string; email: string; message: string }) => {
    alert('Thank you! Your message has been sent!');
   
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#eff6ff] to-[#dbeafe] flex flex-col items-center justify-center py-16">
      <div className="relative z-10 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-extrabold text-blue-800 tracking-tight mb-4">
            Connect With Our Community
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            We’re passionate about photography and here to connect with creators worldwide. Share your vision with us!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <ContactForm onSubmit={handleFormSubmit} />
          <div className="space-y-6">
            <ContactInfocard items={contactInfo} />
            <SocialMediaLinks items={socialMedia} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
