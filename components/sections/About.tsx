import { useLocale } from '@/context/LocaleContext';

const About = () => {
  const { getCopy } = useLocale();
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">{getCopy('aboutUs')}</h2>

        <p className="text-gray-700 leading-snug mb-6">{getCopy('aboutUsSubtitle')}</p>

        <div className="bg-gray-50 rounded-xl p-5 text-left shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {getCopy('meetOurLeadTeacher')}
          </h3>
          <p className="text-gray-700 leading-snug mb-1">{getCopy('meetOurLeadTeacherSubtitle')}</p>
        </div>
      </div>
    </section>
  );
};

export default About;
