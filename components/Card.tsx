import ButtonCTA from './Button';
import { Course } from './sections/Class';

type CardProps = {
  course: Course;
  isSelected?: boolean;
  onSelect?: (id: number) => void;
};

const Card = (props: CardProps) => {
  const { course, isSelected = false, onSelect } = props;
  const { title, subtitle, description, price, duration, level, pax, session, meetings } = course;

  const handleClick = () => {
    if (onSelect) {
      onSelect(course.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col justify-between h-full rounded-xl border p-6 shadow-sm transition transform cursor-pointer
        ${isSelected ? 'border-blue-200 bg-blue-50 shadow-md scale-105' : 'border-gray-200 bg-white hover:shadow-md hover:scale-105'}
      `}
    >
      <div>
        <h3 className="text-xl font-bold text-brand-primary">{title}</h3>
        <h3 className="text-gray-800 font-semibold">{subtitle}</h3>

        <div className="mt-6">
          <p className="text-xl font-bold text-gray-900">
            {price}/{pax > 1 ? pax + ' months' : 'month'}
          </p>
        </div>

        <p className="mt-6 text-sm text-gray-600">{description}</p>

        <div className="space-y-1 text-sm text-gray-600 mt-4">
          <p>
            <span className="font-medium">Level:</span> {level}
          </p>
          <p>
            <span className="font-medium">Duration:</span> {duration}
          </p>
          <p>
            <span className="font-medium">Session:</span> {session} mins
          </p>
          <p>{meetings} meetings/month</p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center">
        <ButtonCTA fullWidth>Select Course</ButtonCTA>
      </div>
    </div>
  );
};

export default Card;
