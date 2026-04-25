import { render, screen, fireEvent } from '@testing-library/react';
import NavbarMobileMenu from '../NavbarMobileMenu';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe('NavbarMobileMenu Component', () => {
  const mockScrollTo = jest.fn();
  const mockHandleLogout = jest.fn();

  const menu = [
    { name: 'Menu 1', id: 'menu-1' },
    { name: 'Menu 2', id: 'menu-2' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when open is false', () => {
    const { container } = render(
      <NavbarMobileMenu
        open={false}
        menu={menu}
        scrollTo={mockScrollTo}
        session={null}
        handleLogout={mockHandleLogout}
      />
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('renders menu items when open is true', () => {
    render(
      <NavbarMobileMenu
        open={true}
        menu={menu}
        scrollTo={mockScrollTo}
        session={null}
        handleLogout={mockHandleLogout}
      />
    );

    expect(screen.getByText('Menu 1')).toBeInTheDocument();
    expect(screen.getByText('Menu 2')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Menu 1'));
    expect(mockScrollTo).toHaveBeenCalledWith('menu-1');
  });

  it('renders user info and logout when session exists', () => {
    const session = {
      user: { name: 'Test User', email: 'test@example.com', image: '/img.png' },
    };

    render(
      <NavbarMobileMenu
        open={true}
        menu={menu}
        scrollTo={mockScrollTo}
        session={session}
        handleLogout={mockHandleLogout}
      />
    );

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Log out'));
    expect(mockHandleLogout).toHaveBeenCalled();
  });

  it('renders user initials when session image is empty', () => {
    const session = {
      user: { name: 'John Doe', email: 'john@example.com' },
    };

    render(
      <NavbarMobileMenu
        open={true}
        menu={menu}
        scrollTo={mockScrollTo}
        session={session}
        handleLogout={mockHandleLogout}
      />
    );

    expect(screen.getByText('J')).toBeInTheDocument();
  });
});
