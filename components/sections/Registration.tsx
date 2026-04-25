'use client';

import { useState } from 'react';
import { scrollTo } from '../utils';
import { useToast } from '../Toast/ToastContext';
import { useLocale } from '@/context/LocaleContext';
import Input from '../Input';
import { useCourseSelection } from '@/context/CourseSelectionContext';

const Registration = () => {
  const { getCopy, redirect } = useLocale();
  const { showToast } = useToast();
  const { selectedCourseId, selectedPriceId, selectedCourseStr, selectedPriceStr } = useCourseSelection();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [background, setBackground] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState<number | string>('');
  const [loading, setLoading] = useState(false);

  const sentToWhatsApp = async () => {
    const message = `Hello, I want to register:
    Name: ${name}
    Email: ${email}
    Phone: ${phone}
    Age: ${age}
    Background: ${background}
    Course: ${selectedCourseStr} ${selectedPriceStr}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/62${process.env.NEXT_PUBLIC_PHONE_NUMBER}?text=${encodedMessage}`,
      '_blank',
    );
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setAge('');
    setBackground('');
    setAddress('');
  };

  const handleValidation = () => {
    if (!selectedCourseId || !selectedPriceId) {
      scrollTo('courses');
      showToast('Please select a course and package', 'error');
      return false;
    }
    return true;
  };

  const isDisabled = !name || !email || !phone || !age || !background || !address || loading;

  const handleSubmit = async () => {
    const valid = await handleValidation();
    if (!valid) return;
    setLoading(true);

    try {
      const payload = {
        name,
        email,
        phone,
        age,
        background,
        address,
        course_id: selectedCourseId,
        price_id: selectedPriceId,
        selectedCourse: selectedCourseStr,
        selectedPrice: selectedPriceStr,
      };

      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        resetForm();
        sentToWhatsApp();
        redirect('/thank-you');
      } else {
        alert(result.error || 'Something went wrong');
        return;
      }
    } catch (error) {
      console.error(error);
      alert('Network error');
    } finally {
      setLoading(false);
    }
  };

  const registrationSubtitle = getCopy('registrationSubtitle');
  const parts = registrationSubtitle.split('{cta}');

  return (
    <section id="registration" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">{getCopy('registration')}</h2>

        <p className="text-gray-600 mb-10">
          {parts[0]}
          <strong>{getCopy('enrollNow')}</strong>
          {parts[1]}
        </p>

        <div className="p-8 bg-brand-bg rounded-lg shadow-md max-w-md mx-auto">
          <Input
            placeholder={getCopy('fullName')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4"
          />
          <Input
            type="email"
            placeholder={getCopy('email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4"
          />
          <Input
            type="tel"
            placeholder={getCopy('phoneNumber')}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mb-6"
          />
          <Input
            placeholder={getCopy('address')}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mb-6"
          />
          <Input
            type="number"
            placeholder={getCopy('age')}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="mb-6"
          />
          <Input
            placeholder={getCopy('background')}
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            className="mb-6"
          />
          <button
            disabled={isDisabled}
            onClick={handleSubmit}
            className="w-full px-6 py-3 bg-brand-primary disabled:opacity-50 text-white font-bold rounded hover:opacity-90 flex items-center justify-center gap-2"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {loading && <span>{getCopy('submitting')}</span>}
            {!loading && <span>{getCopy('enrollNow')}</span>}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Registration;
