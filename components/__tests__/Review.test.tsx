import { render, screen } from '@testing-library/react';
import Review from '../Review';

describe('Review Component', () => {
  it('renders correctly without rating', () => {
    render(<Review id={1} testimonial="Great!" name="John Doe" role="Student" />);

    expect(screen.getByText('Great!')).toBeInTheDocument();
    expect(screen.getByText('John Doe #1')).toBeInTheDocument();
    
    // SVG quote should be present
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('renders rating stars correctly', () => {
    render(<Review id={1} testimonial="Great!" name="John" role="Student" rating={3} />);

    // 5 stars total. 3 filled, 2 empty (gray)
    const stars = screen.getAllByText('★');
    expect(stars.length).toBe(5);

    // The first 3 should not have text-gray-300 class
    expect(stars[0]).not.toHaveClass('text-gray-300');
    expect(stars[1]).not.toHaveClass('text-gray-300');
    expect(stars[2]).not.toHaveClass('text-gray-300');

    // The last 2 should have text-gray-300 class
    expect(stars[3]).toHaveClass('text-gray-300');
    expect(stars[4]).toHaveClass('text-gray-300');
  });
});
