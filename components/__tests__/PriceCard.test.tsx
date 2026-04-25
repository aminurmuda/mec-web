import { render, screen, fireEvent } from '@testing-library/react';
import PriceCard from '../PriceCard';

// Mock contexts
jest.mock('@/context/LocaleContext', () => ({
  useLocale: () => ({ locale: 'en', getCopy: (key: string) => key }),
}));

const mockSetSelectedPriceId = jest.fn();

jest.mock('@/context/CourseSelectionContext', () => ({
  useCourseSelection: () => ({
    selectedPriceId: 10,
    setSelectedPriceId: mockSetSelectedPriceId,
  }),
}));

const mockPrice = {
  id: 10,
  period: 1,
  price: 100000,
};

describe('PriceCard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders price information correctly', () => {
    render(<PriceCard price={mockPrice} index={0} />);

    expect(screen.getByText(/100\.000/)).toBeInTheDocument();
  });

  it('renders saveMore badge when index is greater than 0', () => {
    render(<PriceCard price={{ ...mockPrice, id: 11, period: 3, price: 250000 }} index={1} />);

    expect(screen.getByText('saveMore')).toBeInTheDocument();
  });

  it('calls scroll and context update functions when selected', () => {
    const mockScroll = jest.fn();
    render(<PriceCard price={mockPrice} index={0} onScrollIntoView={mockScroll} />);

    const cardElement = screen.getByText(/100\.000/).closest('div')?.parentElement;
    if (cardElement) {
      fireEvent.click(cardElement);
    }

    expect(mockSetSelectedPriceId).toHaveBeenCalledWith(10);
    expect(mockScroll).toHaveBeenCalled();
  });
});
