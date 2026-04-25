import { render, screen } from '@testing-library/react';
import About from '../About';
import { useLocale } from '@/context/LocaleContext';

jest.mock('@/context/LocaleContext', () => ({
  useLocale: jest.fn(),
}));

describe('About Section', () => {
  beforeEach(() => {
    (useLocale as jest.Mock).mockReturnValue({ getCopy: (key: string) => key });
  });

  it('renders about section with correct copy keys', () => {
    render(<About />);

    expect(screen.getByText('aboutUs')).toBeInTheDocument();
    expect(screen.getByText('aboutUsSubtitle')).toBeInTheDocument();
    expect(screen.getByText('meetOurLeadTeacher')).toBeInTheDocument();
    expect(screen.getByText('meetOurLeadTeacherSubtitle')).toBeInTheDocument();
  });
});
