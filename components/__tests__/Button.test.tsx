import { render, screen, fireEvent } from '@testing-library/react';
import ButtonCTA from '../Button';
import * as utils from '../utils';

// Mock the scrollTo utility
jest.mock('../utils', () => ({
  scrollTo: jest.fn(),
}));

describe('ButtonCTA Component', () => {
  it('renders children correctly', () => {
    render(<ButtonCTA>Click Me</ButtonCTA>);

    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('calls scrollTo utility when clicked', () => {
    render(<ButtonCTA>Click Me</ButtonCTA>);

    const buttonElement = screen.getByText('Click Me');
    fireEvent.click(buttonElement);

    expect(utils.scrollTo).toHaveBeenCalledWith('price-cards');
    expect(utils.scrollTo).toHaveBeenCalledTimes(1);
  });

  it('applies fullWidth class when fullWidth prop is true', () => {
    render(<ButtonCTA fullWidth>Full Width</ButtonCTA>);

    const buttonElement = screen.getByText('Full Width');
    expect(buttonElement).toHaveClass('w-full');
  });
});
