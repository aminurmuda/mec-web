import { ReactNode } from 'react';

type CardProps = {
  isSelected?: boolean;
  onSelect?: () => void;
  children: ReactNode;
};

const Card = ({ isSelected, onSelect, children }: CardProps) => {
  const handleClick = () => {
    if (onSelect) {
      onSelect();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col justify-between h-full rounded-xl border p-6 shadow-sm transition transform cursor-pointer
        ${isSelected ? 'border-blue-200 bg-blue-50 shadow-md scale-105' : 'border-gray-200 bg-white hover:shadow-md hover:scale-105'}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
