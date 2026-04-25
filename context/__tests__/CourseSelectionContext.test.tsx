import { render, screen } from '@testing-library/react';
import { CourseSelectionContext, useCourseSelection } from '../CourseSelectionContext';
import { Course } from '@/type/course';

const TestComponent = () => {
  const { selectedCourseId, selectedPriceId, selectedCourseStr, selectedPriceStr } = useCourseSelection();

  return (
    <div>
      <p>CourseId: {selectedCourseId}</p>
      <p>PriceId: {selectedPriceId}</p>
      <p>CourseStr: {selectedCourseStr}</p>
      <p>PriceStr: {selectedPriceStr}</p>
    </div>
  );
};

describe('CourseSelectionContext', () => {
  it('throws error when useCourseSelection is used outside of provider', () => {
    // Suppress console.error for expected error boundary log
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => render(<TestComponent />)).toThrow(
      'useCourseSelection must be used within a CourseSelectionProvider'
    );
    
    consoleSpy.mockRestore();
  });

  it('provides context values correctly', () => {
    const mockContextValue = {
      selectedCourseId: 5,
      setSelectedCourseId: jest.fn(),
      selectedPriceId: 10,
      setSelectedPriceId: jest.fn(),
      courses: [] as Course[],
      selectedCourseStr: 'Course 5',
      selectedPriceStr: 'Price 10',
    };

    render(
      <CourseSelectionContext.Provider value={mockContextValue}>
        <TestComponent />
      </CourseSelectionContext.Provider>
    );

    expect(screen.getByText('CourseId: 5')).toBeInTheDocument();
    expect(screen.getByText('PriceId: 10')).toBeInTheDocument();
    expect(screen.getByText('CourseStr: Course 5')).toBeInTheDocument();
    expect(screen.getByText('PriceStr: Price 10')).toBeInTheDocument();
  });
});
