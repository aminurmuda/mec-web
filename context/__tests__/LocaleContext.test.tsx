import { render, screen } from '@testing-library/react';
import LocaleContext, { useLocale } from '../LocaleContext';

const TestComponent = () => {
  const { locale } = useLocale();

  return <p>{locale}</p>;
};

describe('LocaleContext', () => {
  it('provides default en locale', () => {
    render(<TestComponent />);
    expect(screen.getByText('en')).toBeInTheDocument();
  });

  it('provides the locale from provider', () => {
    const mockValue = {
      locale: 'id' as 'id' | 'en',
      getCopy: (k: string) => k,
      redirect: jest.fn(),
    };

    render(
      <LocaleContext.Provider value={mockValue}>
        <TestComponent />
      </LocaleContext.Provider>
    );

    expect(screen.getByText('id')).toBeInTheDocument();
  });
});
