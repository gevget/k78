(() => {
  const track = document.querySelector('[data-review-track]');
  const previous = document.querySelector('[data-review-prev]');
  const next = document.querySelector('[data-review-next]');
  if (!track || !previous || !next) return;

  const move = (direction) => {
    const slide = track.querySelector('.review-slide');
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: direction * ((slide?.getBoundingClientRect().width || track.clientWidth) + gap), behavior: 'smooth' });
  };

  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
})();
