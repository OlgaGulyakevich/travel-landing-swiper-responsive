/**
 * Burger Menu Module
 * Controls mobile menu open/close and scroll lock
 */

export const initBurgerMenu = () => {
  const burger = document.querySelector('[data-burger]');
  const menu = document.querySelector('.header__nav');
  const menuLinks = menu?.querySelectorAll('a');

  if (!burger || !menu) {
    return;
  }

  const toggleMenu = () => {
    const isOpen = menu.classList.contains('is-open');

    // Calculate scrollbar width before locking to prevent layout shift
    if (!isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
    } else {
      document.documentElement.style.setProperty('--scrollbar-width', '0px');
    }

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

    // Reset scrollbar width when menu closes
    document.documentElement.style.setProperty('--scrollbar-width', '0px');
  };

  // Toggle on burger click
  burger.addEventListener('click', toggleMenu);

  // Close on menu link click
  menuLinks?.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      closeMenu();
    }
  });
};
