'use client';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About / Brand */}
        <div className="space-y-4">
          <h3 className="text-white text-xl font-bold w-5 leading-6">Medeena English Center</h3>
          <p className="text-gray-300 text-sm">
            Helping learners gain confidence in English through practical, real-world learning
            programs.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <a href="#hero" className="hover:text-white transition">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-white transition">
                About
              </a>
            </li>
            <li>
              <a href="#courses" className="hover:text-white transition">
                Courses
              </a>
            </li>
            <li>
              <a href="#registration" className="hover:text-white transition">
                Register
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contact Us</h4>
          <p className="text-gray-300 text-sm">
            Phone: +62{' '}
            <a
              href={`https://wa.me/62${process.env.NEXT_PUBLIC_PHONE_NUMBER}`}
              className="text-gray-300"
            >
              {process.env.NEXT_PUBLIC_PHONE_NUMBER}
            </a>
          </p>
          <p className="text-gray-300 text-sm">Email: info@medeenaenglish.com</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-300 font-semibold hover:text-white transition">
              FB
            </a>
            <a
              href="https://www.instagram.com/medeenaenglishcenter/"
              className="text-gray-300 font-semibold hover:text-white transition"
            >
              IG
            </a>
            <a href="#" className="text-gray-300 font-semibold hover:text-white transition">
              YT
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Medeena English Center. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
