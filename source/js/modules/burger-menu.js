/**
 * Burger Menu Module
 * Controls mobile menu open/close and scroll lock
 */

export const initBurgerMenu = () => {
  const burger = document.querySelector('[data-burger]');
  const menu = document.querySelector('.header__nav');
  const menuLinks = menu?.querySelectorAll('a');

  if (!burger || !menu) return;

  const toggleMenu = () => {
    const isOpen = menu.classList.contains('is-open');
    
    menu.classList.toggle('is-open');
    burger.classList.toggle('is-active');
    document.body.classList.toggle('scroll-lock');
    
    burger.setAttribute('aria-expanded', !isOpen);
  };

  const closeMenu = () => {
    menu.classList.remove('is-open');
    burger.classList.remove('is-active');
    document.body.classList.remove('scroll-lock');
    burger.setAttribute('aria-expanded', 'false');
  };

  // Toggle on burger click
  burger.addEventListener('click', toggleMenu);

  // Close on menu link click
  menuLinks?.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      closeMenu();
    }
  });
};
