import { render, screen, fireEvent } from '@testing-library/react';
import AuthButton from '../AuthButton';
import { useSession, signIn, signOut } from 'next-auth/react';

const mockGet = jest.fn();

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: mockGet,
  }),
}));

describe('AuthButton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGet.mockReturnValue(null);
  });

  it('renders login button when unauthenticated', () => {
    (useSession as jest.Mock).mockReturnValue({ data: null, status: 'unauthenticated' });
    render(<AuthButton />);

    const button = screen.getByRole('button', { name: /login with google/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(signIn).toHaveBeenCalledWith('google');
  });

  it('renders logout button when authenticated', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: 'Test User' } },
      status: 'authenticated',
    });
    render(<AuthButton />);

    const button = screen.getByRole('button', { name: /logout/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(signOut).toHaveBeenCalledTimes(1);
  });

  it('renders error message when error query parameter is AccessDenied', () => {
    (useSession as jest.Mock).mockReturnValue({ data: null, status: 'unauthenticated' });
    mockGet.mockReturnValue('AccessDenied');
    render(<AuthButton />);

    expect(
      screen.getByText(/access denied. your email is not registered on the allowed list/i),
    ).toBeInTheDocument();
  });

  it('renders generic error message when error query parameter is anything else', () => {
    (useSession as jest.Mock).mockReturnValue({ data: null, status: 'unauthenticated' });
    mockGet.mockReturnValue('Configuration');
    render(<AuthButton />);

    expect(screen.getByText(/an authentication error occurred/i)).toBeInTheDocument();
  });
});
