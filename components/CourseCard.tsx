import { Course } from '@/type/course';
import ButtonCTA from './Button';
import { formatPrice } from './utils';
import Card from './Card';

type CourseCardProps = {
  course: Course;
  isSelected?: boolean;
  onSelect?: (id: number) => void;
  selectedPriceId: number;
  setSelectedPriceId: (id: number) => void;
};

const CourseCard = (props: CourseCardProps) => {
  const { course, isSelected = false, onSelect, selectedPriceId, setSelectedPriceId } = props;
  const { title, subtitle, description, prices, course_duration, session, meetings } = course;

  const selectedPrice = prices.find((price) => price.id === selectedPriceId) ?? prices[0];

  const handleClick = () => {
    if (onSelect) {
      setSelectedPriceId(prices[0].id);
      onSelect(course.id);
    }
  };

  const finalPrice = formatPrice(selectedPrice?.price / selectedPrice.period);
  const originalPrice = formatPrice(prices[0].price);

  const isFirstPriceSelected = prices.length > 1 && selectedPriceId === prices[0].id;
  const showOriginalPrice = isSelected && !isFirstPriceSelected && !originalPrice.includes('Free');

  return (
    <Card isSelected={isSelected} onSelect={handleClick} config={course.config}>
      <div>
        <h3 className="text-xl font-bold text-brand-primary">{title}</h3>
        <h3 className="text-gray-800 font-semibold">{subtitle}</h3>

        <div className={isFirstPriceSelected || finalPrice.includes('Free') ? 'mt-12' : 'mt-6'}>
          {showOriginalPrice && (
            <p
              className="line-through text-gray-400 text-sm font-bold"
              style={{ marginBottom: '3px' }}
            >
              {originalPrice}/month
            </p>
          )}
          <p className={`text-xl font-bold text-gray-900 ${!isSelected && 'mt-12'}`}>
            {!finalPrice.includes('Free') ? finalPrice + '/month' : finalPrice}
          </p>
        </div>

        <p className="mt-6 text-sm text-gray-600">{description}</p>

        <div className="space-y-1 text-sm text-gray-600 mt-4">
          <p>
            <span className="font-medium">Duration:</span> {course_duration}
            {course_duration > 1 ? ' months' : ' month'}
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
    </Card>
  );
};

export default CourseCard;
