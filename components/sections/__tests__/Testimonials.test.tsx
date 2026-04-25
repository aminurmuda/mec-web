import { render, screen } from '@testing-library/react';
import Testimonials from '../Testimonials';
import { useLocale } from '@/context/LocaleContext';

jest.mock('@/context/LocaleContext', () => ({
  useLocale: jest.fn(),
}));

// Mock Review component to simplify test
jest.mock('../../Review', () => {
  return function MockReview({ testimonial }: { testimonial: string }) {
    return <div data-testid="mock-review">{testimonial}</div>;
  };
});

describe('Testimonials Section', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders indonesian testimonials when locale is id', () => {
    (useLocale as jest.Mock).mockReturnValue({ locale: 'id', getCopy: (key: string) => key });
    render(<Testimonials />);

    expect(screen.getByText('testimonials')).toBeInTheDocument();
    expect(screen.getByText('testimonialsSubtitle')).toBeInTheDocument();
    
    // Check for an indonesian testimonial string
    expect(screen.getByText(/Aku punya masalah banget di speaking/i)).toBeInTheDocument();
  });

  it('renders english testimonials when locale is en', () => {
    (useLocale as jest.Mock).mockReturnValue({ locale: 'en', getCopy: (key: string) => key });
    render(<Testimonials />);

    // Check for an english testimonial string
    expect(screen.getByText(/I used to struggle a lot with speaking/i)).toBeInTheDocument();
  });
});
