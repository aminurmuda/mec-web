import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer Section', () => {
  it('renders footer content', () => {
    render(<Footer />);

    expect(screen.getByText('Medeena English Center')).toBeInTheDocument();
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });

  it('contains proper quick links', () => {
    render(<Footer />);

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '#hero');
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '#about');
    expect(screen.getByRole('link', { name: 'Courses' })).toHaveAttribute('href', '#courses');
    expect(screen.getByRole('link', { name: 'Register' })).toHaveAttribute('href', '#registration');
  });

  it('contains social links', () => {
    render(<Footer />);

    expect(screen.getByText('IG')).toHaveAttribute('href', 'https://www.instagram.com/medeenaenglishcenter/');
  });
});
