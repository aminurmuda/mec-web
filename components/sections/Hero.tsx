"use client" 

const Hero = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)

    if (!el) {
      return
    }
    el.scrollIntoView({
      behavior: "smooth",
    })
  }

  return (
    <section className="py-28 bg-linear-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold mb-6 text-gray-800">
          Learn English With Confidence
        </h1>

        <p className="text-lg mb-8">
          Practical English programs designed to help beginners
          speak confidently in everyday and professional situations.
        </p>

        <button
            onClick={() => scrollTo("classes")}
            className="px-8 py-3 bg-brand-primary text-white rounded-lg hover:opacity-90 font-bold"
        >
            Start Learning
        </button>
      </div>
    </section>
  )
}

export default Hero