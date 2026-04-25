import { Price } from '@/type/course';
import { formatPrice } from './utils';
import Card from './Card';
import { useLocale } from '@/context/LocaleContext';

interface PriceCardProps {
  price: Price;
  selectedPriceId: number;
  setSelectedPriceId: (id: number) => void;
  index: number;
}

const PriceCard = ({ price, selectedPriceId, setSelectedPriceId, index }: PriceCardProps) => {
  const { locale, getCopy } = useLocale();
  const isFirstIndex = index === 0;
  return (
    <Card isSelected={price.id === selectedPriceId} onSelect={() => setSelectedPriceId(price.id)}>
      <div className="relative">
        {!isFirstIndex && (
          <span className="bg-red-400 text-white text-xs font-semibold px-4 py-2 rounded-full shadow absolute -right-2 -top-2">
            {getCopy('saveMore')}
          </span>
        )}

        <p className="text-sm">
          {price.period} {price.period > 1 ? getCopy('months') : getCopy('month')}
        </p>

        <p className="font-extrabold mt-2">
          {formatPrice(price.price, locale)}
          {!isFirstIndex && (
            <span>
              /{price.period} {getCopy('months')}
            </span>
          )}
        </p>
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
