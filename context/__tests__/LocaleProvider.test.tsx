import { render, screen, fireEvent } from '@testing-library/react';
import LocaleProvider from '../LocaleProvider';
import { useLocale } from '../LocaleContext';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/lib/dictionaries', () => ({
  dictionaries: {
    en: { greeting: 'Hello' },
    id: { greeting: 'Halo' },
  },
}));

const TestComponent = () => {
  const { getCopy, redirect, locale } = useLocale();

  return (
    <div>
      <p>Locale: {locale}</p>
      <p>{getCopy('greeting')}</p>
      <p>{getCopy('missing_key')}</p>
      <button onClick={() => redirect('/about')}>Redirect About</button>
      <button onClick={() => redirect('/id/courses')}>Redirect ID Courses</button>
    </div>
  );
};

describe('LocaleProvider', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it('provides the current locale and copies correctly', () => {
    render(
      <LocaleProvider locale="en">
        <TestComponent />
      </LocaleProvider>
    );

    expect(screen.getByText('Locale: en')).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('returns key if copy is missing', () => {
    render(
      <LocaleProvider locale="en">
        <TestComponent />
      </LocaleProvider>
    );

    expect(screen.getByText('missing_key')).toBeInTheDocument();
  });

  it('redirects with locale prefix when path does not have it', () => {
    render(
      <LocaleProvider locale="en">
        <TestComponent />
      </LocaleProvider>
    );

    fireEvent.click(screen.getByText('Redirect About'));
    expect(mockPush).toHaveBeenCalledWith('/en/about');
  });

  it('redirects without adding locale prefix if path already has it', () => {
    render(
      <LocaleProvider locale="en">
        <TestComponent />
      </LocaleProvider>
    );

    fireEvent.click(screen.getByText('Redirect ID Courses'));
    expect(mockPush).toHaveBeenCalledWith('/id/courses');
  });
});
