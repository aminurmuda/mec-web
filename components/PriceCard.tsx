import { Price } from '@/type/course';
import { formatPrice } from './utils';
import Card from './Card';
import { useLocale } from '@/context/LocaleContext';

interface PriceCardProps {
  price: Price;
  selectedPriceId: number;
  setSelectedPriceId: (id: number) => void;
}

const PriceCard = ({ price, selectedPriceId, setSelectedPriceId }: PriceCardProps) => {
  const { locale, getCopy } = useLocale();
  return (
    <Card isSelected={price.id === selectedPriceId} onSelect={() => setSelectedPriceId(price.id)}>
      <p className="text-sm">
        {price.period} {price.period > 1 ? getCopy('months') : getCopy('month')}
      </p>
      <p className="font-extrabold">{formatPrice(price.price, locale)}</p>
    </Card>
  );
};

export default PriceCard;
