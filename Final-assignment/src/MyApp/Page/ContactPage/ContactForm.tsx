import React, { useState, type FormEvent } from 'react';

interface ContactFormProps {
  onSubmit: (data: { name: string; email: string; message: string }) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-white/30 backdrop-blur-md rounded-xl p-8 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">Send Us a Message</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 bg-white/80 border border-gray-200 rounded-lg text-gray-800 focus:border-blue-600 focus:outline-none transition duration-300"
            placeholder="Your Name"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 bg-white/80 border border-gray-200 rounded-lg text-gray-800 focus:border-blue-600 focus:outline-none transition duration-300"
            placeholder="your@email.com"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1">Message</label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-2 bg-white/80 border border-gray-200 rounded-lg text-gray-800 focus:border-blue-600 focus:outline-none transition duration-300 resize-none h-32"
            placeholder="Your Message..."
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
