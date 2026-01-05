const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
const carousel = document.querySelector('.carousel-track');
const buttons = document.querySelectorAll('.carousel-btn');

function toggleNav() {
  if (!navToggle || !navList) return;
  const isOpen = navList.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
}

function setupCarousel() {
  if (!carousel || !buttons.length) return;

  let index = 0;
  const cards = Array.from(carousel.children);

  function getVisibleCount() {
    const card = carousel.firstElementChild;
    if (!card) return 1;
    const cardWidth = card.getBoundingClientRect().width;
    const available = carousel.parentElement.offsetWidth;
    return Math.max(Math.floor(available / (cardWidth + 16)), 1);
  }

  function updateTrack() {
    const card = carousel.firstElementChild;
    if (!card) return;
    const cardWidth = card.getBoundingClientRect().width;
    const visible = getVisibleCount();
    const maxIndex = Math.max(cards.length - visible, 0);
    index = Math.min(index, maxIndex);
    const offset = index * (cardWidth + 16);
    carousel.style.transform = `translateX(-${offset}px)`;
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const direction = button.dataset.direction === 'next' ? 1 : -1;
      const visible = getVisibleCount();
      const maxIndex = Math.max(cards.length - visible, 0);
      index = (index + direction + maxIndex + 1) % (maxIndex + 1);
      updateTrack();
    });
  });

  window.addEventListener('resize', updateTrack);
  updateTrack();
}

if (navToggle) {
  navToggle.addEventListener('click', toggleNav);
}

document.addEventListener('click', (event) => {
  if (!navList || !navToggle) return;
  if (!navList.contains(event.target) && !navToggle.contains(event.target)) {
    navList.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  setupCarousel();
});
