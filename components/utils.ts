export const scrollTo = (id: string) => {
  const el = document.getElementById(id);

  if (!el) return;

  const nav = document.querySelector('nav');
  const navHeight = nav?.offsetHeight || 0;

  const top = el.getBoundingClientRect().top + window.scrollY - navHeight;

  window.scrollTo({
    top,
    behavior: 'smooth',
  });
};
