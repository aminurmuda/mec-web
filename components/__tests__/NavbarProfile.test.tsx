import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NavbarProfile from '../NavbarProfile';
import { useSession, signOut } from 'next-auth/react';
import { useLocale } from '@/context/LocaleContext';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('@/context/LocaleContext', () => ({
  useLocale: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe('NavbarProfile Component', () => {
  const mockRedirect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useLocale as jest.Mock).mockReturnValue({ redirect: mockRedirect });
  });

  it('renders loading state', () => {
    (useSession as jest.Mock).mockReturnValue({ data: null, status: 'loading' });
    render(<NavbarProfile />);

    // Since loading renders an empty div with animation class, we can check for that
    const div = screen.getByRole('generic').querySelector('.animate-pulse');
    expect(div).toBeInTheDocument();
  });

  it('renders nothing when unauthenticated', () => {
    (useSession as jest.Mock).mockReturnValue({ data: null, status: 'unauthenticated' });
    const { container } = render(<NavbarProfile />);

    expect(container).toBeEmptyDOMElement();
  });

  it('renders user image and toggles dropdown', async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: 'Test User', email: 'test@example.com', image: '/test.png' } },
      status: 'authenticated',
    });

    render(<NavbarProfile />);

    const button = screen.getByRole('button');
    expect(screen.getByAltText('Test User')).toBeInTheDocument();

    // Click to open dropdown
    fireEvent.click(button);

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();

    // Click profile
    fireEvent.click(screen.getByText('Profile'));
    expect(mockRedirect).toHaveBeenCalledWith('/profile');

    // Re-open and click logout
    fireEvent.click(button);
    fireEvent.click(screen.getByText('Log out'));
    expect(signOut).toHaveBeenCalledWith({ callbackUrl: '/' });
  });

  it('renders initials when user has no image', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: 'John Doe', email: 'john@example.com' } },
      status: 'authenticated',
    });

    render(<NavbarProfile />);

    expect(screen.getByText('J')).toBeInTheDocument();
  });
  
  it('closes dropdown when clicking outside', async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: 'John Doe', email: 'john@example.com' } },
      status: 'authenticated',
    });

    render(
      <div>
        <NavbarProfile />
        <div data-testid="outside">Outside</div>
      </div>
    );

    const button = screen.getByRole('button');
    
    // Open
    fireEvent.click(button);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    
    // Click outside
    fireEvent.mouseDown(screen.getByTestId('outside'));
    
    await waitFor(() => {
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });
  });
});
