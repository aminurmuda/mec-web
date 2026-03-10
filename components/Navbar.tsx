"use client"
import { League_Spartan } from "next/font/google"

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-league-spartan",
})


const Navbar = () => {
  const menu = [
    { name: "Classes", id: "classes" },
    { name: "Registration", id: "registration" },
    { name: "Insights", id: "insights" },
    { name: "About", id: "about" },
    { name: "Testimonials", id: "testimonials" },
  ]

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
    <nav className="sticky top-0 bg-brand-bg z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className={`${leagueSpartan.variable} font-sans font-extrabold text-lg text-brand-primary w-25 leading-none`}>
          Medeena English Center
        </h1>

        <div className="flex gap-8 text-sm font-medium">

          {menu.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="hover:text-white transition text-brand-primary font-semibold text-lg"
            >
              {item.name}
            </button>
          ))}

        </div>

      </div>
    </nav>
  )
}

export default Navbar