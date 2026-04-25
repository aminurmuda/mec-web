import { scrollTo, formatPrice } from '../utils';

describe('utils', () => {
  describe('scrollTo', () => {
    let mockScrollTo: jest.Mock;
    let mockGetElementById: jest.Mock;
    let mockQuerySelector: jest.Mock;

    beforeEach(() => {
      mockScrollTo = jest.fn();
      window.scrollTo = mockScrollTo;

      mockGetElementById = jest.spyOn(document, 'getElementById') as jest.Mock;
      mockQuerySelector = jest.spyOn(document, 'querySelector') as jest.Mock;
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('returns false if element not found', () => {
      mockGetElementById.mockReturnValue(null);
      const result = scrollTo('missing');
      expect(result).toBe(false);
      expect(mockScrollTo).not.toHaveBeenCalled();
    });

    it('scrolls to element with nav offset', () => {
      const mockElement = {
        getBoundingClientRect: () => ({ top: 100 }),
      };
      mockGetElementById.mockReturnValue(mockElement);

      const mockNav = {
        offsetHeight: 60,
      };
      mockQuerySelector.mockReturnValue(mockNav);
      
      // Mock window.scrollY
      Object.defineProperty(window, 'scrollY', { value: 50, configurable: true });

      const result = scrollTo('found');
      
      expect(result).toBe(true);
      // 100 (top) + 50 (scrollY) - 60 (navHeight) = 90
      expect(mockScrollTo).toHaveBeenCalledWith({ top: 90, behavior: 'smooth' });
    });

    it('scrolls to element with 0 nav offset if nav not found', () => {
      const mockElement = {
        getBoundingClientRect: () => ({ top: 100 }),
      };
      mockGetElementById.mockReturnValue(mockElement);
      mockQuerySelector.mockReturnValue(null);
      
      Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });

      scrollTo('found');
      
      expect(mockScrollTo).toHaveBeenCalledWith({ top: 100, behavior: 'smooth' });
    });
  });

  describe('formatPrice', () => {
    it('returns Free/Gratis when value is 0 based on locale', () => {
      expect(formatPrice(0, 'en')).toBe('Free');
      expect(formatPrice(0, 'id')).toBe('Gratis');
    });

    it('formats number correctly with Rp prefix', () => {
      expect(formatPrice(100000, 'en')).toBe('Rp 100.000');
      expect(formatPrice(2500000, 'id')).toBe('Rp 2.500.000');
    });
  });
});
