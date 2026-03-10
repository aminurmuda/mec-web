import Review from '../Review';

const testimonials = [
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
  return (
    <section id="testimonials" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-100">
          What Our Students Say
        </h2>

        <p className="text-gray-200 mb-10 text-center">
          Our programs welcome learners from various backgrounds – university and master’s students,
          working professionals, teachers, and IELTS candidates. Each class is designed to provide
          practical and engaging learning experiences, help students builds confidence and apply
          English in both everyday and professional settings. Here’s the students’ testimonials of
          the English programs.
        </p>

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
