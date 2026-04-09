import { useLocale } from '@/context/LocaleContext';
import Review from '../Review';

const testimonialsId = [
  {
    id: 1,
    name: 'Murid',
    testimonial:
      'Aku punya masalah banget di speaking. Tapi karena ikut kelas Speaking bareng Ms. Anna, meski bahasaku belum sempurna, alhamdulillah jadi bisa lebih pede ngomong bahasa Inggris! Ms. Anna sabar banget dengering bahasa Inggrisku yang masih berantakan :") THank you Miss!',
    rating: 5,
    role: 'Mahasiswa',
  },
  {
    id: 2,
    name: 'Murid',
    testimonial:
      'Kesan saya dalam mengikuti kelas daring sangat menyenangkan sekali karena mentor selain berpengalaman juga sangat amat mengajari dengan teliti',
    rating: 5,
    role: 'Mahasiswa Magister',
  },
  {
    id: 3,
    name: 'Murid',
    testimonial:
      'Saya sangat senang mengikuti kelas daring bahasa Inggris di MEC. Materinya mudah dipahami, dan pengajarnya sangat interaktif dan membantu. Saya merasa kemampuan bahasa inggris saya meningkat pesat setelah mengikuti kelas ini.',
    rating: 5,
    role: 'Pekerja Swasta',
  },
  {
    id: 4,
    name: 'Murid',
    testimonial:
      'After I joined the class I thing my english is getting better. Also learning english with Miss Anna was fun and enjoy. Thank you Miss Anna.',
    rating: 5,
    role: 'Guru',
  },
  {
    id: 5,
    name: 'Murid',
    testimonial: 'Pembelajaran yang jelas dan mudah difahami',
    rating: 5,
    role: 'Dosen',
  },
  {
    id: 6,
    name: 'Murid',
    testimonial: 'seru menyenangkan fleksibel',
    rating: 5,
    role: 'Pekerja BUMN',
  },
];

const testimonialsEn = [
  {
    id: 1,
    name: 'Student',
    testimonial:
      'I used to struggle a lot with speaking. But after joining the Speaking class with Ms. Anna, even though my English is still not perfect, I feel much more confident speaking now! Ms. Anna was very patient listening to my messy English :") Thank you, Miss!',
    rating: 5,
    role: 'University Student',
  },
  {
    id: 2,
    name: 'Student',
    testimonial:
      'My experience attending the online class was very enjoyable. The mentor was not only experienced but also taught very carefully and clearly.',
    rating: 5,
    role: 'Master’s Student',
  },
  {
    id: 3,
    name: 'Student',
    testimonial:
      'I really enjoyed joining the online English class at MEC. The materials were easy to understand, and the teacher was very interactive and helpful. I feel that my English skills improved significantly after attending this class.',
    rating: 5,
    role: 'Private Sector Employee',
  },
  {
    id: 4,
    name: 'Student',
    testimonial:
      'After I joined the class I think my English is getting better. Also learning English with Ms. Anna was fun and enjoyable. Thank you Miss Anna.',
    rating: 5,
    role: 'Teacher',
  },
  {
    id: 5,
    name: 'Student',
    testimonial: 'The lessons were clear and easy to understand.',
    rating: 5,
    role: 'Lecturer',
  },
  {
    id: 6,
    name: 'Student',
    testimonial: 'Fun, enjoyable, and flexible learning experience.',
    rating: 5,
    role: 'State-Owned Enterprise Employee',
  },
];

const Testimonials = () => {
  const { locale, getCopy } = useLocale();
  const testimonials = locale === 'id' ? testimonialsId : testimonialsEn;
  return (
    <section id="testimonials" className="py-24 bg-brand-primary">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-100">
          {getCopy('testimonials')}
        </h2>

        <p className="text-gray-200 mb-10 text-center">{getCopy('testimonialsSubtitle')}</p>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <Review key={testimonial.id} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
