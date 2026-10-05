(() => {
  const nav = document.querySelector('.direction-pills');
  if (!nav) return;
  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const cards = links.map(link => document.getElementById(decodeURIComponent(link.hash.slice(1)))).filter(Boolean);
  const setActive = id => links.forEach(link => {
    const active = link.hash === `#${id}`;
    link.classList.toggle('is-active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  links.forEach(link => link.addEventListener('click', () => setActive(decodeURIComponent(link.hash.slice(1)))));
  if (location.hash) setActive(decodeURIComponent(location.hash.slice(1)));
  if ('IntersectionObserver' in window) {
    const visible = new Map();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting ? visible.set(entry.target.id, entry.boundingClientRect.top) : visible.delete(entry.target.id));
      if (visible.size) {
        const nearest = [...visible.entries()].sort((a,b) => Math.abs(a[1] - 150) - Math.abs(b[1] - 150))[0];
        setActive(nearest[0]);
      }
    }, { rootMargin: '-105px 0px -58% 0px', threshold: 0 });
    cards.forEach(card => observer.observe(card));
  }
})();
