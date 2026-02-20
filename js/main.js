
// ✦ Personal Pink Site JS ✦
(() => {
  // Set active nav item
  const page = document.body.dataset.page;
  document.querySelectorAll('.nav a').forEach(a => {
    const p = a.dataset.page;
    if (p && p === page) a.setAttribute('aria-current','page');
  });

  // Footer year
  const y = new Date().getFullYear();
  const yEl = document.querySelector('[data-year]');
  if (yEl) yEl.textContent = y;

  // Tiny mood line
  const moods = [
    "currently: vibing ✧",
    "currently: gaming & glitter ✨",
    "currently: cozy chaos 💖",
    "currently: collecting cute pixels 🎀",
    "currently: late-night scrolling 🌙"
  ];
  const moodEl = document.querySelector('[data-mood]');
  if (moodEl){
    const idx = Math.floor(Math.random()*moods.length);
    moodEl.textContent = moods[idx];
  }

  // Click sparkles (respects reduced motion)
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce){
    window.addEventListener('pointerdown', (e) => {
      // Don't sparkle on right click
      if (e.button === 2) return;
      const count = 7;
      for (let i=0;i<count;i++){
        const s = document.createElement('span');
        s.className = 'sparkle';
        const dx = (Math.random()*90 - 45).toFixed(0) + 'px';
        const dy = (Math.random()*90 - 45).toFixed(0) + 'px';
        s.style.left = e.clientX + 'px';
        s.style.top  = e.clientY + 'px';
        s.style.setProperty('--dx', dx);
        s.style.setProperty('--dy', dy);
        document.body.appendChild(s);
        setTimeout(() => s.remove(), 700);
      }
    }, {passive:true});
  }

  // Simple "copy" buttons (for Discord, etc.)
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = btn.getAttribute('data-copy') || '';
      try{
        await navigator.clipboard.writeText(text);
        const old = btn.textContent;
        btn.textContent = 'copied ✦';
        setTimeout(() => btn.textContent = old, 900);
      }catch(err){
        alert('Copy failed. Your browser blocked it.');
      }
    });
  });
})();
