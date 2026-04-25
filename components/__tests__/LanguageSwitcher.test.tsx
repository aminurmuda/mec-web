import { render, screen, fireEvent } from '@testing-library/react';
import LanguageSwitcher from '../LanguageSwitcher';
import { useLocale } from '@/context/LocaleContext';
import { usePathname } from 'next/navigation';

jest.mock('@/context/LocaleContext', () => ({
  useLocale: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('LanguageSwitcher Component', () => {
  const mockRedirect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useLocale as jest.Mock).mockReturnValue({ redirect: mockRedirect });
  });

  it('renders correctly for English locale and toggles to Indonesian', () => {
    (usePathname as jest.Mock).mockReturnValue('/en/about');
    render(<LanguageSwitcher />);

    const button = screen.getByRole('button');
    expect(screen.getByText('EN')).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockRedirect).toHaveBeenCalledWith('/id/about');
  });

  it('renders correctly for Indonesian locale and toggles to English', () => {
    (usePathname as jest.Mock).mockReturnValue('/id/courses');
    render(<LanguageSwitcher />);

    const button = screen.getByRole('button');
    expect(screen.getByText('ID')).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockRedirect).toHaveBeenCalledWith('/en/courses');
  });

  it('handles root pathname correctly', () => {
    (usePathname as jest.Mock).mockReturnValue('/');
    render(<LanguageSwitcher />);

    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    // It should redirect to next locale
    expect(mockRedirect).toHaveBeenCalledWith('/en');
  });

  it('handles null pathname correctly', () => {
    (usePathname as jest.Mock).mockReturnValue(null);
    render(<LanguageSwitcher />);

    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockRedirect).toHaveBeenCalledWith('/en');
  });
});
