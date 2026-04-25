import { Locale } from '@/lib/i18n';

export const scrollTo = (id: string) => {
  const el = document.getElementById(id);

  if (!el) return false;

  const nav = document.querySelector('nav');
  const navHeight = nav?.offsetHeight || 0;

  const top = el.getBoundingClientRect().top + window.scrollY - navHeight;

  window.scrollTo({
    top,
    behavior: 'smooth',
  });

  return true;
};

export const formatPrice = (value: number, locale: Locale) => {
  if (value === 0) return locale === 'en' ? 'Free' : 'Gratis';
  const roundedValue = Math.round(value);
  return 'Rp ' + new Intl.NumberFormat('id-ID').format(roundedValue);
};
