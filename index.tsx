
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle') as HTMLInputElement | null;
  const navMenu = document.querySelector('.nav-menu');
  const sections = document.querySelectorAll('header[id], section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const navHeight = 70; // As defined in CSS

  // --- Click to Scroll & Close Mobile Menu ---
  if (navMenu) {
    const allNavLinks = navMenu.querySelectorAll('a');
    allNavLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault(); // Stop the default anchor link behavior

        const targetId = link.getAttribute('href');
        if (targetId) {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            // Use scrollIntoView for smooth, reliable scrolling
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
        
        // Close mobile menu on link click
        if (navToggle && navToggle.checked) {
          navToggle.checked = false;
        }
      });
    });
  }


  // --- Scrollspy for Active Nav Link Highlighting ---
  const activateLink = (id: string | null) => {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (id && link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
        }
    });
  };

  const observer = new IntersectionObserver((entries) => {
    // Find the entry that is most visible at the top of the viewport
    const intersectingEntries = entries.filter(e => e.isIntersecting);
    if (intersectingEntries.length > 0) {
      // Sort by the intersection rect's y position to find the topmost visible section
      intersectingEntries.sort((a, b) => a.boundingClientRect.y - b.boundingClientRect.y);
      activateLink(intersectingEntries[0].target.getAttribute('id'));
    }
  }, {
    rootMargin: `-${navHeight}px 0px 0px 0px`,
    threshold: 0.1 // Use a small threshold to catch sections as soon as they appear
  });

  sections.forEach(section => {
    observer.observe(section);
  });
});
