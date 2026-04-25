import { render, screen, act } from '@testing-library/react';
import FloatingVisitorCounter from '../FloatingVisitorCounter';

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ total: 100 }),
  })
) as jest.Mock;

describe('FloatingVisitorCounter Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders and animates counter correctly', async () => {
    // We need to wrap render in act if we expect state updates
    await act(async () => {
      render(<FloatingVisitorCounter />);
    });

    // Advance timers so useEffect finishes its animation
    act(() => {
      jest.advanceTimersByTime(1500);
    });

    // The component should render the total visitors
    const counterElement = screen.getByText(/Total Visitors: 100/i);
    expect(counterElement).toBeInTheDocument();
  });

  it('generates visitorId if not in localStorage', async () => {
    await act(async () => {
      render(<FloatingVisitorCounter />);
    });

    expect(localStorage.getItem('visitorId')).toBeTruthy();
    expect(global.fetch).toHaveBeenCalledTimes(2); // One for POST, one for GET
  });

  it('does not generate visitorId if already in localStorage', async () => {
    localStorage.setItem('visitorId', 'test-id');

    await act(async () => {
      render(<FloatingVisitorCounter />);
    });

    expect(global.fetch).toHaveBeenCalledTimes(1); // Only GET
  });
});
