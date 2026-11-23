/* ==========================================================================
   ARSALAN.GITHUB — SIGNATURE ENDING (SECTION 10)
   Scroll-Controlled Morphing: "THIS WAS MINE." -> "GET YOURS NOW!"
   Exact Required Line: "if you don't get it you're f*cked in today's era"
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.signature-ending-section');
  if (!section) return;

  const initialText = section.querySelector('.sig-text-initial');
  const transformedText = section.querySelector('.sig-text-transformed');
  const subStatement = section.querySelector('.sig-sub-statement');
  const ctaHolder = section.querySelector('.sig-cta-holder');

  let isTransformed = false;

  function onScroll() {
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calculate how far into the section the user has scrolled
    // 0 = section top reached bottom of viewport, 1 = section center aligned
    const scrollProgress = (windowHeight - rect.top) / (rect.height + windowHeight * 0.4);

    if (scrollProgress >= 0.45) {
      if (!isTransformed) {
        section.classList.add('state-transformed');
        isTransformed = true;
      }
    } else {
      if (isTransformed) {
        section.classList.remove('state-transformed');
        isTransformed = false;
      }
    }

    // Dynamic continuous parallax/scale based on scroll progress
    if (scrollProgress > 0 && scrollProgress < 1.2) {
      const dynamicScale = 1 + (scrollProgress - 0.45) * 0.08;
      if (isTransformed && transformedText) {
        transformedText.style.transform = `scale(${Math.min(Math.max(dynamicScale, 0.95), 1.08)})`;
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  // Initial check
  onScroll();
});
