import { CardConfig } from '@/type/course';
import { ReactNode } from 'react';

type CardProps = {
  isSelected?: boolean;
  onSelect?: () => void;
  children: ReactNode;
  config?: CardConfig;
};

const Card = ({ isSelected, onSelect, children, config }: CardProps) => {
  const { isClosed, label } = config || {};
  const handleClick = () => {
    if (onSelect && !isClosed) {
      onSelect();
    }
  };

  return (
    <div className="h-full relative">
      {isClosed && (
        <div className="absolute top-5 left-3 z-10">
          <span className="bg-red-400 text-white text-xs font-semibold px-6 py-2 rounded-full shadow">
            Temporarily Closed
          </span>
        </div>
      )}

      {isClosed && label && (
        <div className="absolute bottom-0 left-0 w-full z-10">
          <div className="flex bg-yellow-100 text-yellow-800 text-xs text-center py-2 rounded-b-xl border-t border-yellow-200 h-20 items-center justify-center">
            <p className="text-center text-sm">{label}</p>
          </div>
        </div>
      )}

      {/* Card */}
      <div
        onClick={handleClick}
        className={`flex flex-col justify-between h-full rounded-xl border p-6 shadow-sm transition transform cursor-pointer relative overflow-hidden
          ${
            isSelected
              ? 'border-blue-200 bg-blue-50 shadow-md scale-105'
              : 'border-gray-200 bg-white hover:shadow-md hover:scale-105'
          }
          ${isClosed ? 'opacity-70 cursor-not-allowed hover:scale-100! blur-[1px]' : ''}
        `}
      >
        {children}
      </div>
    </div>
  );
};

export default Card;
