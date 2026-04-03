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
  return (
    <Card isSelected={price.id === selectedPriceId} onSelect={() => setSelectedPriceId(price.id)}>
      <p className="text-sm">
        {price.period} {price.period === 1 ? 'month package' : 'month packages'}
      </p>
      <p className="font-extrabold">{formatPrice(price.price)}</p>
    </Card>
  );
};

export default PriceCard;
