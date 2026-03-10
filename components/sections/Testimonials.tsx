const testimonials = [
    {
        id: 1,
        name: 'Student',
        testimonial: 'Aku punya masalah banget di speaking. Tapi karena ikut kelas Speaking bareng Ms. Anna, meski bahasaku belum sempurna, alhamdulillah jadi bisa lebih pede ngomong bahasa Inggris! Ms. Anna sabar banget dengering bahasa Inggrisku yang masih berantakan :") THank you Miss!',
        role: 'Mahasiswa'
    },
    {
        id: 2,
        name: 'Student',
        testimonial: 'Kesan saya dalam mengikuti kelas daring sangat menyenangkan sekali karena mentor selain berpengalaman juga sangat amat mengajari dengan teliti',
        role: 'Mahasiswa Magister'
    },
    {
        id: 3,
        name: 'Student',
        testimonial: 'Saya sangat senang mengikuti kelas daring bahasa Inggris di MEC. Materinya mudah dipahami, dan pengajarnya sangat interaktif dan membantu. Saya merasa kemampuan bahasa inggris saya meningkat pesat setelah mengikuti kelas ini.',
        role: 'Pekerja Swasta'
    },
    {
        id: 4,
        name: 'Student',
        testimonial: 'After I joined the class I thing my english is getting better. Also learning english with Miss Anna was fun and enjoy. Thank you Miss Anna.',
        role: 'Guru'
    },
    {
        id: 5,
        name: 'Student',
        testimonial: 'Pembelajaran yang jelas dan mudah difahami',
        role: 'Dosen'
    },
    {
        id: 6,
        name: 'Student',
        testimonial: 'seru menyenangkan fleksibel',
        role: 'Pekerja BUMN'
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