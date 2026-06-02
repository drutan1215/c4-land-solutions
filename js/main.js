// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Navbar scroll state
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

function setMenuOpen(open) {
  navMenu.classList.toggle('open', open);
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  document.body.style.overflow = open ? 'hidden' : '';
}

navToggle.addEventListener('click', () => {
  setMenuOpen(!navMenu.classList.contains('open'));
});

navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    setMenuOpen(false);
  });
});

// Scroll-triggered fade-up animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(
  '.service-card, .contact-card, .gallery-item, .why-item, .about-grid, .area-grid'
).forEach((el, i) => {
  el.classList.add('fade-up');
  // stagger cards within the same grid
  const delay = el.closest('.services-grid, .contact-cards, .gallery-grid, .why-grid')
    ? `${(i % 4) * 0.1}s`
    : '0s';
  el.style.transitionDelay = delay;
  observer.observe(el);
});
