(() => {
  const hero = document.querySelector("[data-raw-hero]");
  if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const layers = [...hero.querySelectorAll("[data-depth]")];
  if (!layers.length) return;

  let mouseX = 0;
  let mouseY = 0;
  let ticking = false;

  function render() {
    const scroll = window.scrollY || window.pageYOffset;
    layers.forEach((layer) => {
      const depth = Number(layer.dataset.depth || 0);
      const y = scroll * depth * -0.22;
      const x = mouseX * depth * 18;
      const tilt = mouseY * depth * 4;
      layer.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${tilt}deg)`;
    });
    ticking = false;
  }

  function requestRender() {
    if (!ticking) {
      window.requestAnimationFrame(render);
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestRender, { passive: true });
  window.addEventListener("pointermove", (event) => {
    mouseX = event.clientX / window.innerWidth - 0.5;
    mouseY = event.clientY / window.innerHeight - 0.5;
    requestRender();
  }, { passive: true });

  render();
})();
