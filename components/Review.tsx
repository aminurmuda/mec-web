interface ReviewProps {
  id: number;
  testimonial: string;
  name: string;
  role: string;
  rating?: number;
}

const Quote = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-quote-icon"
  >
    <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
    <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
  </svg>
);

const Review = (props: ReviewProps) => {
  const { id, testimonial, name, role, rating } = props;

  const maxStars = 5;

  return (
    <div key={id} className="p-6 border rounded-xl flex flex-col justify-between bg-white">
      <div>
        <div className="flex justify-between">
          {rating && (
            <div className="mb-2 flex gap-1 text-yellow-400">
              {Array.from({ length: maxStars }, (_, i) => {
                if (i < rating) {
                  return <span key={i}>★</span>;
                } else {
                  return (
                    <span key={i} className="text-gray-300">
                      ★
                    </span>
                  );
                }
              })}
            </div>
          )}

          <div className="text-brand-bg">
            <Quote />
          </div>
        </div>

        <p className="text-gray-600 italic">{testimonial}</p>
      </div>

      <div className="mt-4">
        <p className="font-semibold text-brand-primary">
          {name} {id}
        </p>
        <p className="font-light text-brand-primary">{role}</p>
      </div>
    </div>
  );
};

export default Review;
