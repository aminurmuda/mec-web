import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../Card';
import { useLocale } from '@/context/LocaleContext';

jest.mock('@/context/LocaleContext', () => ({
  useLocale: jest.fn(),
}));

describe('Card Component', () => {
  beforeEach(() => {
    (useLocale as jest.Mock).mockReturnValue({ getCopy: (k: string) => k });
  });

  it('renders children correctly', () => {
    render(<Card>Test Content</Card>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('calls onSelect when clicked and not closed', () => {
    const mockOnSelect = jest.fn();
    render(<Card onSelect={mockOnSelect}>Content</Card>);

    const card = screen.getByText('Content').parentElement;
    fireEvent.click(card!);

    expect(mockOnSelect).toHaveBeenCalled();
  });

  it('does not call onSelect when clicked and closed', () => {
    const mockOnSelect = jest.fn();
    render(<Card onSelect={mockOnSelect} config={{ isClosed: true }}>Content</Card>);

    const card = screen.getByText('Content').parentElement;
    fireEvent.click(card!);

    expect(mockOnSelect).not.toHaveBeenCalled();
  });

  it('renders closed badge and label when isClosed is true', () => {
    render(<Card config={{ isClosed: true, label: 'Full capacity' }}>Content</Card>);

    expect(screen.getByText('temporarilyClosed')).toBeInTheDocument();
    expect(screen.getByText('Full capacity')).toBeInTheDocument();
  });
  
  it('renders without label when isClosed but no label is provided', () => {
    render(<Card config={{ isClosed: true }}>Content</Card>);

    expect(screen.getByText('temporarilyClosed')).toBeInTheDocument();
  });
});
