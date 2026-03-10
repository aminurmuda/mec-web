const testimonials = [
  {
    id: 1,
    name: 'Student',
    testimonial: 'I used to struggle a lot with speaking. But after joining the Speaking class with Ms. Anna, even though my English is still not perfect, I feel much more confident speaking now! Ms. Anna was very patient listening to my messy English :") Thank you, Miss!',
    role: 'University Student'
  },
  {
    id: 2,
    name: 'Student',
    testimonial: 'My experience attending the online class was very enjoyable. The mentor was not only experienced but also taught very carefully and clearly.',
    role: 'Master’s Student'
  },
  {
    id: 3,
    name: 'Student',
    testimonial: 'I really enjoyed joining the online English class at MEC. The materials were easy to understand, and the teacher was very interactive and helpful. I feel that my English skills improved significantly after attending this class.',
    role: 'Private Sector Employee'
  },
  {
    id: 4,
    name: 'Student',
    testimonial: 'After I joined the class I think my English is getting better. Also learning English with Ms. Anna was fun and enjoyable. Thank you Miss Anna.',
    role: 'Teacher'
  },
  {
    id: 5,
    name: 'Student',
    testimonial: 'The lessons were clear and easy to understand.',
    role: 'Lecturer'
  },
  {
    id: 6,
    name: 'Student',
    testimonial: 'Fun, enjoyable, and flexible learning experience.',
    role: 'State-Owned Enterprise Employee'
  },
]

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24">

      <div className="max-w-5xl mx-auto px-6">

        <h2 className="text-3xl font-bold text-center mb-12 text-gray-100">
          What Our Students Say
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

            {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="p-6 border rounded-xl flex flex-col justify-between bg-brand-bg">
                    <p className="text-gray-600">
                        {testimonial.testimonial}
                    </p>
                    <p className="mt-4 font-semibold text-brand-primary">
                        {testimonial.name} {testimonial.id}, {testimonial.role}
                    </p>
                </div>
            ))}

        </div>

      </div>

    </section>
  )
}

export default Testimonials