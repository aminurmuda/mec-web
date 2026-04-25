import { render, screen, fireEvent } from '@testing-library/react';
import CoursesSection from '../Course';
import { useLocale } from '@/context/LocaleContext';
import { useCourseSelection } from '@/context/CourseSelectionContext';

jest.mock('@/context/LocaleContext', () => ({
  useLocale: jest.fn(),
}));

jest.mock('@/context/CourseSelectionContext', () => ({
  useCourseSelection: jest.fn(),
}));

// Mock child components
jest.mock('../../CourseCard', () => () => <div data-testid="course-card" />);
jest.mock('../../PriceCard', () => () => <div data-testid="price-card" />);

describe('CoursesSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useLocale as jest.Mock).mockReturnValue({ getCopy: (k: string) => k });
  });

  it('renders skeleton loaders when no courses', () => {
    (useCourseSelection as jest.Mock).mockReturnValue({
      selectedCourseId: 0,
      courses: [],
    });

    const { container } = render(<CoursesSection />);
    expect(screen.getByText('ourProgram')).toBeInTheDocument();
    
    // Should render 4 skeleton items
    const skeletons = container.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBe(4);
  });

  it('renders courses when available', () => {
    (useCourseSelection as jest.Mock).mockReturnValue({
      selectedCourseId: 0,
      courses: [{ id: 1, title: 'Course 1' }, { id: 2, title: 'Course 2' }],
    });

    render(<CoursesSection />);
    
    const courseCards = screen.getAllByTestId('course-card');
    expect(courseCards.length).toBe(2);
  });

  it('renders price cards when a course is selected and has prices', () => {
    const mockCourse = {
      id: 1,
      title: 'Course 1',
      prices: [{ id: 10, price: 100 }, { id: 11, price: 200 }]
    };

    (useCourseSelection as jest.Mock).mockReturnValue({
      selectedCourseId: 1,
      courses: [mockCourse],
    });

    render(<CoursesSection />);
    
    const priceCards = screen.getAllByTestId('price-card');
    expect(priceCards.length).toBe(2);
  });

  it('scrolls left and right when buttons are clicked', () => {
    (useCourseSelection as jest.Mock).mockReturnValue({
      selectedCourseId: 0,
      courses: [],
    });

    render(<CoursesSection />);
    
    const scrollLeftBtn = screen.getByLabelText('Scroll Left');
    const scrollRightBtn = screen.getByLabelText('Scroll Right');

    // Mocks scrollBy
    const scrollByMock = jest.fn();
    const scrollContainer = document.querySelector('.overflow-x-auto');
    if (scrollContainer) {
      scrollContainer.scrollBy = scrollByMock;
    }

    fireEvent.click(scrollLeftBtn);
    expect(scrollByMock).toHaveBeenCalledWith({ left: -320, behavior: 'smooth' });

    fireEvent.click(scrollRightBtn);
    expect(scrollByMock).toHaveBeenCalledWith({ left: 320, behavior: 'smooth' });
  });
});
