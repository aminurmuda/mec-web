'use client';

const Insights = () => {
  return (
    <section id="insights" className="py-20 bg-brand-bg">
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Section Heading */}
        <h2 className="text-4xl font-bold mb-4 text-gray-800">English Insights</h2>
        <p className="text-lg mb-12 text-gray-600">
          Tips, strategies, and resources to help you improve your English faster.
        </p>

        {/* Placeholder Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Placeholder cards */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Insights;
