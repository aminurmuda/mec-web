import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../Navbar';
import { useSession } from 'next-auth/react';
import { useLocale } from '@/context/LocaleContext';
import * as utils from '../utils';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('@/context/LocaleContext', () => ({
  useLocale: jest.fn(),
}));

jest.mock('../utils', () => ({
  scrollTo: jest.fn().mockReturnValue(true),
}));

// Mock sub-components to isolate Navbar tests
jest.mock('../LanguageSwitcher', () => () => <div data-testid="language-switcher" />);
jest.mock('../NavbarProfile', () => () => <div data-testid="navbar-profile" />);
jest.mock('../NavbarMobileMenu', () => ({ open }: { open: boolean }) => (
  <div data-testid="navbar-mobile-menu" data-open={open} />
));

describe('Navbar Component', () => {
  const mockRedirect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useLocale as jest.Mock).mockReturnValue({ locale: 'en', redirect: mockRedirect });
    (useSession as jest.Mock).mockReturnValue({ data: null, status: 'unauthenticated' });
    
    // Mock NEXT_PUBLIC_SHOW_LANGUAGE_SWITCHER
    process.env.NEXT_PUBLIC_SHOW_LANGUAGE_SWITCHER = 'true';
  });

  it('renders logo and english menu items correctly', () => {
    render(<Navbar />);

    expect(screen.getByText('Medeena English Center')).toBeInTheDocument();
    expect(screen.getByText('Courses')).toBeInTheDocument();
    expect(screen.getByText('Registration')).toBeInTheDocument();
  });

  it('renders indonesian menu items when locale is id', () => {
    (useLocale as jest.Mock).mockReturnValue({ locale: 'id', redirect: mockRedirect });
    render(<Navbar />);

    expect(screen.getByText('Kelas')).toBeInTheDocument();
    expect(screen.getByText('Pendaftaran')).toBeInTheDocument();
  });

  it('scrolls to section on desktop menu click', () => {
    render(<Navbar />);

    fireEvent.click(screen.getByText('Courses'));
    expect(utils.scrollTo).toHaveBeenCalledWith('courses');
  });

  it('redirects to home if scroll fails (element not found)', () => {
    (utils.scrollTo as jest.Mock).mockReturnValueOnce(false);
    render(<Navbar />);

    fireEvent.click(screen.getByText('Courses'));
    expect(mockRedirect).toHaveBeenCalledWith('/#courses');
  });

  it('renders LanguageSwitcher and Profile when enabled', () => {
    render(<Navbar />);

    expect(screen.getAllByTestId('language-switcher').length).toBeGreaterThan(0);
    expect(screen.getByTestId('navbar-profile')).toBeInTheDocument();
  });

  it('toggles mobile menu on burger click', () => {
    render(<Navbar />);

    // initially false
    expect(screen.getByTestId('navbar-mobile-menu')).toHaveAttribute('data-open', 'false');

    // open
    const burgerButton = screen.getByRole('button', { name: '' }); // The burger button has no text, just div spans
    // It's the button with no text inside .md:hidden
    // We can select it by its class
    const buttons = screen.getAllByRole('button');
    const burger = buttons.find(b => b.className.includes('md:hidden'));
    
    if (burger) fireEvent.click(burger);
    expect(screen.getByTestId('navbar-mobile-menu')).toHaveAttribute('data-open', 'true');
    
    // close
    if (burger) fireEvent.click(burger);
    expect(screen.getByTestId('navbar-mobile-menu')).toHaveAttribute('data-open', 'false');
  });

  it('renders Edit Course button when authenticated', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: 'test@test.com' } },
      status: 'authenticated',
    });
    render(<Navbar />);

    const editBtn = screen.getByText('Edit Course');
    expect(editBtn).toBeInTheDocument();

    fireEvent.click(editBtn);
    expect(mockRedirect).toHaveBeenCalledWith('/courses');
  });
});
