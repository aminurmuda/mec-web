const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">About Us</h2>

        <p className="text-gray-700 leading-snug mb-6">
          Our mission is to help learners gain confidence in speaking English through practical,
          real-world learning methods. We create engaging lessons tailored to different levels, so
          learners can practice speaking, listening, reading, and writing effectively. Join us and
          experience a supportive environment where every student can improve at their own pace
          while enjoying the journey of learning English.
        </p>

        <div className="bg-gray-50 rounded-xl p-5 text-left shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Meet Our Lead Teacher</h3>
          <p className="text-gray-700 leading-snug mb-1">
            Our lead teacher has been teaching English since 2018, holds a TESOL certification, and
            has extensive experience guiding professionals from diverse backgrounds.
          </p>
          <p className="text-gray-700 leading-snug">
            They also mentor students for IELTS preparation, providing personalized strategies and
            real-world practice to help learners achieve their best scores.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
