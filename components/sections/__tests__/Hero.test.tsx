import { render, screen, fireEvent } from '@testing-library/react';
import Hero from '../Hero';
import { useLocale } from '@/context/LocaleContext';
import * as utils from '../../utils';

jest.mock('@/context/LocaleContext', () => ({
  useLocale: jest.fn(),
}));

jest.mock('../../utils', () => ({
  scrollTo: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe('Hero Section', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useLocale as jest.Mock).mockReturnValue({ getCopy: (key: string) => key });
  });

  it('renders hero content correctly', () => {
    render(<Hero />);

    expect(screen.getByText('heroTitle')).toBeInTheDocument();
    expect(screen.getByText('heroSubtitle')).toBeInTheDocument();
    expect(screen.getByAltText('Hero Background')).toBeInTheDocument();
  });

  it('calls scrollTo when button is clicked', () => {
    render(<Hero />);

    const button = screen.getByText('heroButton');
    fireEvent.click(button);

    expect(utils.scrollTo).toHaveBeenCalledWith('courses');
  });
});
