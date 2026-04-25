import { render, screen, fireEvent, act } from '@testing-library/react';
import Toast from '../index';
import { ToastProvider, useToast } from '../ToastContext';

describe('Toast Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders correctly with different types', () => {
    const { rerender } = render(<Toast message="Success" type="success" onClose={jest.fn()} />);
    expect(screen.getByText('Success')).toBeInTheDocument();
    
    rerender(<Toast message="Error" type="error" onClose={jest.fn()} />);
    expect(screen.getByText('Error')).toBeInTheDocument();

    rerender(<Toast message="Info" type="info" onClose={jest.fn()} />);
    expect(screen.getByText('Info')).toBeInTheDocument();
  });

  it('calls onClose after timeout', () => {
    const mockOnClose = jest.fn();
    render(<Toast message="Test" type="info" onClose={mockOnClose} />);

    act(() => {
      jest.advanceTimersByTime(3300); // 3000ms visibility + 300ms fade out
    });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when close button is clicked', () => {
    const mockOnClose = jest.fn();
    render(<Toast message="Test" type="info" onClose={mockOnClose} />);

    fireEvent.click(screen.getByText('✕'));

    act(() => {
      jest.advanceTimersByTime(300); // 300ms fade out
    });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});

const TestComponent = () => {
  const { showToast } = useToast();

  return (
    <button onClick={() => showToast('Test Message', 'success')}>
      Show Toast
    </button>
  );
};

describe('ToastContext', () => {
  it('throws error when used outside provider', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<TestComponent />)).toThrow('useToast must be used within ToastProvider');
    consoleSpy.mockRestore();
  });

  it('shows toast when showToast is called', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Toast'));
    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });
});
