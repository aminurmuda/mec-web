import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Registration from '../Registration';
import { useLocale } from '@/context/LocaleContext';
import { useCourseSelection } from '@/context/CourseSelectionContext';
import { useToast } from '../../Toast/ToastContext';
import * as utils from '../../utils';

jest.mock('@/context/LocaleContext', () => ({
  useLocale: jest.fn(),
}));

jest.mock('@/context/CourseSelectionContext', () => ({
  useCourseSelection: jest.fn(),
}));

jest.mock('../../Toast/ToastContext', () => ({
  useToast: jest.fn(),
}));

jest.mock('../../utils', () => ({
  scrollTo: jest.fn(),
}));

global.fetch = jest.fn() as jest.Mock;

describe('Registration Section', () => {
  const mockRedirect = jest.fn();
  const mockShowToast = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useLocale as jest.Mock).mockReturnValue({ getCopy: (k: string) => k, redirect: mockRedirect });
    (useToast as jest.Mock).mockReturnValue({ showToast: mockShowToast });
    (useCourseSelection as jest.Mock).mockReturnValue({
      selectedCourseId: 1,
      selectedPriceId: 10,
      selectedCourseStr: 'Course 1',
      selectedPriceStr: 'Price 10',
    });
    
    window.open = jest.fn();
    window.alert = jest.fn();
  });

  it('renders registration form', () => {
    render(<Registration />);

    expect(screen.getByText('registration')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('fullName')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('email')).toBeInTheDocument();
  });

  it('validates course selection before submit', async () => {
    (useCourseSelection as jest.Mock).mockReturnValue({
      selectedCourseId: 0,
      selectedPriceId: 0,
      selectedCourseStr: '',
      selectedPriceStr: '',
    });

    render(<Registration />);

    // Fill form to enable button
    fireEvent.change(screen.getByPlaceholderText('fullName'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('email'), { target: { value: 'j@j.com' } });
    fireEvent.change(screen.getByPlaceholderText('phoneNumber'), { target: { value: '123' } });
    fireEvent.change(screen.getByPlaceholderText('address'), { target: { value: 'Address' } });
    fireEvent.change(screen.getByPlaceholderText('age'), { target: { value: '20' } });
    fireEvent.change(screen.getByPlaceholderText('background'), { target: { value: 'Student' } });

    fireEvent.click(screen.getByText('enrollNow', { selector: 'button span' }));

    expect(utils.scrollTo).toHaveBeenCalledWith('courses');
    expect(mockShowToast).toHaveBeenCalledWith('Please select a course and package', 'error');
  });

  it('submits form successfully', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<Registration />);

    fireEvent.change(screen.getByPlaceholderText('fullName'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('email'), { target: { value: 'j@j.com' } });
    fireEvent.change(screen.getByPlaceholderText('phoneNumber'), { target: { value: '123' } });
    fireEvent.change(screen.getByPlaceholderText('address'), { target: { value: 'Address' } });
    fireEvent.change(screen.getByPlaceholderText('age'), { target: { value: '20' } });
    fireEvent.change(screen.getByPlaceholderText('background'), { target: { value: 'Student' } });

    fireEvent.click(screen.getByText('enrollNow', { selector: 'button span' }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    expect(window.open).toHaveBeenCalled();
    expect(mockRedirect).toHaveBeenCalledWith('/thank-you');
  });

  it('handles submission error', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Error message' }),
    });

    render(<Registration />);

    fireEvent.change(screen.getByPlaceholderText('fullName'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('email'), { target: { value: 'j@j.com' } });
    fireEvent.change(screen.getByPlaceholderText('phoneNumber'), { target: { value: '123' } });
    fireEvent.change(screen.getByPlaceholderText('address'), { target: { value: 'Address' } });
    fireEvent.change(screen.getByPlaceholderText('age'), { target: { value: '20' } });
    fireEvent.change(screen.getByPlaceholderText('background'), { target: { value: 'Student' } });

    fireEvent.click(screen.getByText('enrollNow', { selector: 'button span' }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Error message');
    });
  });
  
  it('handles network error', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
    
    // Mute console.error
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<Registration />);

    fireEvent.change(screen.getByPlaceholderText('fullName'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('email'), { target: { value: 'j@j.com' } });
    fireEvent.change(screen.getByPlaceholderText('phoneNumber'), { target: { value: '123' } });
    fireEvent.change(screen.getByPlaceholderText('address'), { target: { value: 'Address' } });
    fireEvent.change(screen.getByPlaceholderText('age'), { target: { value: '20' } });
    fireEvent.change(screen.getByPlaceholderText('background'), { target: { value: 'Student' } });

    fireEvent.click(screen.getByText('enrollNow', { selector: 'button span' }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Network error');
    });
    
    spy.mockRestore();
  });
});
