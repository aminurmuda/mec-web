import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../Input';

describe('Input Component', () => {
  it('renders correctly with default props', () => {
    const mockOnChange = jest.fn();
    render(<Input value="" onChange={mockOnChange} placeholder="Test placeholder" />);

    const inputElement = screen.getByPlaceholderText('Test placeholder');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'text');
  });

  it('renders with custom type and value', () => {
    const mockOnChange = jest.fn();
    render(<Input type="email" value="test@example.com" onChange={mockOnChange} />);

    const inputElement = screen.getByDisplayValue('test@example.com');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'email');
  });

  it('calls onChange handler when typing', () => {
    const mockOnChange = jest.fn();
    render(<Input value="" onChange={mockOnChange} placeholder="Type here" />);

    const inputElement = screen.getByPlaceholderText('Type here');
    fireEvent.change(inputElement, { target: { value: 'Hello' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
