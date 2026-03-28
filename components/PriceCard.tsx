import { Price } from '@/app/page';
import { formatPrice } from './utils';
import Card from './Card';
import { useEffect } from 'react';

interface PriceCardProps {
  price: Price;
  selectedPriceId: number;
  setSelectedPriceId: (id: number) => void;
}

const PriceCard = ({ price, selectedPriceId, setSelectedPriceId }: PriceCardProps) => {
  useEffect(() => {
    console.log('selectedPriceId', selectedPriceId);
  }, [selectedPriceId]);
  return (
    <Card isSelected={price.id === selectedPriceId} onSelect={() => setSelectedPriceId(price.id)}>
      <p>
        {price.period} {price.period === 1 ? 'month' : 'months'}
      </p>
      <p>{formatPrice(price.price)}</p>
    </Card>
  );
};

export default PriceCard;
