import { render, screen } from '@testing-library/react';
import Insights from '../Insights';
import { useLocale } from '@/context/LocaleContext';

jest.mock('@/context/LocaleContext', () => ({
  useLocale: jest.fn(),
}));

describe('Insights Section', () => {
  beforeEach(() => {
    (useLocale as jest.Mock).mockReturnValue({ getCopy: (key: string) => key });
  });

  it('renders insights content', () => {
    render(<Insights />);

    expect(screen.getByText('insightTitle')).toBeInTheDocument();
    expect(screen.getByText('insightSubtitle')).toBeInTheDocument();
  });
});
