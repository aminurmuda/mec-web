'use client';

import { useState } from 'react';

interface RegistrationProps {
  selectedCourse: string;
}

const Registration = ({ selectedCourse }: RegistrationProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = () => {
    const message = `Hello, I want to register:
Name: ${name}
Email: ${email}
Phone: ${phone}
Course: ${selectedCourse}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/628999325539?text=${encodedMessage}`, '_blank');
  };

  return (
    <section id="registration" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Registration</h2>

        <p className="text-gray-600 mb-10">
          Fill in your details below and click <strong>Enroll Now</strong>. We will receive your
          registration information directly via WhatsApp and contact you to confirm your enrollment.
        </p>

        <div className="p-8 bg-brand-bg rounded-lg shadow-md max-w-md mx-auto">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-4 px-4 py-2 border border-gray-200 bg-white rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-2 border border-gray-200 bg-white rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full mb-6 px-4 py-2 border border-gray-200 bg-white rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={handleSubmit}
            className="w-full px-6 py-3 bg-brand-primary text-white font-bold rounded hover:opacity-90"
          >
            Enroll Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Registration;
