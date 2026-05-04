import { Price } from '@/type/course';
import { formatPrice } from './utils';
import Card from './Card';
import { useLocale } from '@/context/LocaleContext';
import { useCourseSelection } from '@/context/CourseSelectionContext';

interface PriceCardProps {
  price: Price;
  index: number;
  onScrollIntoView?: () => void;
}

const PriceCard = ({ price, index, onScrollIntoView }: PriceCardProps) => {
  const { locale, getCopy } = useLocale();
  const { selectedPriceId, setSelectedPriceId, selectedCourseId, courses } = useCourseSelection();
  const isFirstIndex = index === 0;

  const selectedCourse = courses.find((c) => c.id === selectedCourseId);
  const originalPriceNumber = selectedCourse?.prices?.[0]?.price || 0;
  const originalPriceStr = formatPrice(originalPriceNumber * price.period, locale);

  const handleClick = () => {
    setSelectedPriceId(price.id);
    if (onScrollIntoView) {
      onScrollIntoView();
    }
  };

  return (
    <Card isSelected={price.id === selectedPriceId} onSelect={handleClick}>
      <div className="relative">
        {!isFirstIndex && (
          <span className="bg-red-400 text-white text-xs font-semibold px-4 py-2 rounded-full shadow absolute -right-2 -top-2">
            {getCopy('saveMore')}
          </span>
        )}

        <p className="text-sm">
          {price.period} {price.period > 1 ? getCopy('months') : getCopy('month')}
        </p>

        <div className="mt-2">
          {!isFirstIndex && originalPriceNumber > 0 && !originalPriceStr.includes(getCopy('free')) && (
            <p
              className="line-through text-gray-400 text-sm font-bold mb-1"
            >
              {originalPriceStr}/{price.period} {getCopy('months')}
            </p>
          )}
          <p className="font-extrabold">
            {formatPrice(price.price, locale)}
            {!isFirstIndex && (
              <span>
                /{price.period} {getCopy('months')}
              </span>
            )}
          </p>
        </div>
        {!isFirstIndex && (
          <p className="text-sm">
            {getCopy('asYouPay')} {getCopy(price.period.toString())} {getCopy('months')}
          </p>
        )}
      </div>
    </Card>
  );
};

export default PriceCard;
