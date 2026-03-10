"use client"

import { useState } from "react"

const Registration = () => {
  const [tab, setTab] = useState("register")

  return (
    <section id="registration" className="py-24 bg-white">

      <div className="max-w-4xl mx-auto px-6 text-center">

        <h2 className="text-3xl font-bold mb-10 text-gray-800">
          Registration
        </h2>

        <div className="flex justify-center gap-4 mb-8">

          <button
            onClick={() => setTab("register")}
            className={
              tab === "register"
                ? "px-4 py-2 rounded bg-blue-200 text-gray-800 font-semibold"
                : "px-4 py-2 rounded bg-blue-100"
            }
          >
            Register
          </button>

          <button
            onClick={() => setTab("promo")}
            className={
              tab === "promo"
                ? "px-4 py-2 rounded bg-blue-200 text-gray-800 font-semibold"
                : "px-4 py-2 rounded bg-blue-100"
            }
          >
            Promo
          </button>

        </div>

        {tab === "register" && (
          <div className="p-6 bg-brand-bg rounded-lg">
            Register today and start your English journey.
          </div>
        )}

        {tab === "promo" && (
          <div className="p-6 bg-brand-bg rounded-lg">
            Limited promotion: 30% discount for new students.
          </div>
        )}

      </div>

    </section>
  )
}

export default Registration