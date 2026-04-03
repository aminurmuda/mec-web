'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ThankYouPage = () => {
  const router = useRouter();

  const handleBackHome = () => {
    router.push('/');
  };

  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Image src="/logo.png" alt="Medeena English" width={80} height={50} />
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-6">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-xl font-semibold text-gray-900 mb-2">Enrollment received</h1>

          <p className="text-sm text-gray-600 mb-6">
            Thanks for enrolling. We’ve received your registration and will contact you shortly via
            WhatsApp.
          </p>

          <div className="border border-blue-100 rounded-lg p-4 mb-6 bg-brand-bg">
            <p className="text-sm text-gray-700">
              A confirmation email has been sent to your inbox.
            </p>
          </div>

          <div className="border-t border-gray-200 my-6"></div>

          <button
            onClick={handleBackHome}
            className="w-full bg-brand-primary text-white py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition"
          >
            Back to homepage
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-6">Medeena English Center</p>
      </div>
    </section>
  );
};

export default ThankYouPage;
