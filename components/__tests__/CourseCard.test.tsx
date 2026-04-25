import { render, screen, fireEvent } from '@testing-library/react';
import CourseCard from '../CourseCard';

// Mock contexts
jest.mock('@/context/LocaleContext', () => ({
  useLocale: () => ({ locale: 'en', getCopy: (key: string) => key }),
}));

const mockSetSelectedCourseId = jest.fn();
const mockSetSelectedPriceId = jest.fn();

jest.mock('@/context/CourseSelectionContext', () => ({
  useCourseSelection: () => ({
    selectedCourseId: 1,
    setSelectedCourseId: mockSetSelectedCourseId,
    selectedPriceId: 10,
    setSelectedPriceId: mockSetSelectedPriceId,
  }),
}));

const mockCourse = {
  id: 1,
  title: 'Test Course',
  subtitle: 'Test Subtitle',
  description: 'Test Description',
  course_duration: 3,
  session: 60,
  meetings: 4,
  order: 1,
  config: { popular: true },
  prices: [
    { id: 10, period: 1, price: 100000 },
    { id: 11, period: 3, price: 250000 },
  ],
};

describe('CourseCard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders course information correctly', () => {
    render(<CourseCard course={mockCourse} />);

    expect(screen.getByText('Test Course')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('calls scroll and context update functions when selected', () => {
    const mockScroll = jest.fn();
    render(<CourseCard course={{ ...mockCourse, id: 2 }} onScrollIntoView={mockScroll} />);

    const cardElement = screen.getByText('Test Course').closest('div')?.parentElement;
    if (cardElement) {
      fireEvent.click(cardElement);
    }

    expect(mockSetSelectedCourseId).toHaveBeenCalledWith(2);
    expect(mockSetSelectedPriceId).toHaveBeenCalledWith(10);
    expect(mockScroll).toHaveBeenCalled();
  });
});
