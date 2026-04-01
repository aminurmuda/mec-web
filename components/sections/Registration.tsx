'use client';

import { useState } from 'react';

interface RegistrationProps {
  selectedCourseId: number;
  selectedPriceId: number;
  selectedCourse: string;
  selectedPrice: string;
}

const Registration = ({
  selectedCourse,
  selectedPrice,
  selectedCourseId,
  selectedPriceId,
}: RegistrationProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [background, setBackground] = useState('');
  const [age, setAge] = useState<number | string>('');

  const sentToWhatsApp = async () => {
    const message = `Hello, I want to register:
    Name: ${name}
    Email: ${email}
    Phone: ${phone}
    Age: ${age}
    Background: ${background}
    Course: ${selectedCourse} ${selectedPrice}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/62${process.env.NEXT_PUBLIC_PHONE_NUMBER}?text=${encodedMessage}`,
      '_blank',
    );
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        name,
        email,
        phone,
        age,
        background,
        course_id: selectedCourseId,
        price_id: selectedPriceId,
      };

      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.error || 'Something went wrong');
        return;
      } else {
        sentToWhatsApp();
      }
    } catch (error) {
      console.error(error);
      alert('Network error');
    }
  };

  return (
    <section id="registration" className="py-20 bg-white">
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
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full mb-6 px-4 py-2 border border-gray-200 bg-white rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Your professional background"
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            className="w-full mb-6 px-4 py-2 border border-gray-200 bg-white rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            disabled={!name || !email || !phone || !age || !background}
            onClick={handleSubmit}
            className="w-full px-6 py-3 bg-brand-primary disabled:opacity-50 text-white font-bold rounded hover:opacity-90"
          >
            Enroll Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Registration;
