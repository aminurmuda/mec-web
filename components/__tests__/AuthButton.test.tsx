import { render, screen, fireEvent } from '@testing-library/react';
import AuthButton from '../AuthButton';
import { useSession, signIn, signOut } from 'next-auth/react';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

describe('AuthButton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
});
