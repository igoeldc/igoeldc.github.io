/**
 * Shared JS — Theme toggle, mobile menu, active section tracking, nav lens
 * Used across all pages (landing, work, academics, blog)
 */

document.addEventListener('DOMContentLoaded', () => {

  // ===========================
  // THEME TOGGLE
  // ===========================
  const themeToggle = document.getElementById('themeToggle');
  const mobileThemeToggle = document.getElementById('mobileThemeToggle');
  const htmlElement = document.documentElement;

  const currentTheme = localStorage.getItem('theme') || 'dark';
  htmlElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  function toggleTheme() {
    const theme = htmlElement.getAttribute('data-theme');
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  }

  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleTheme);

  function updateThemeIcon(theme) {
    const icon = theme === 'dark' ? '☀️' : '🌙';
    if (themeToggle) themeToggle.textContent = icon;
    if (mobileThemeToggle) mobileThemeToggle.textContent = icon;
  }

  // ===========================
  // MOBILE MENU (hamburger drawer — desktop only fallback)
  // ===========================
  const menuIcon = document.querySelector('.menu-icon');
  const navLinks = document.querySelector('.nav-links');
  const navLinkItems = document.querySelectorAll('.nav-links a');

  if (menuIcon && navLinks) {
    menuIcon.addEventListener('click', () => {
      menuIcon.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    navLinkItems.forEach(link => {
      link.addEventListener('click', () => {
        menuIcon.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        menuIcon.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  }

  // ===========================
  // ACTIVE SECTION TRACKING
  // ===========================
  const sections = document.querySelectorAll('section, header, footer');
  const sectionLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  if (sectionLinks.length > 0 && sections.length > 0) {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '-120px 0px -50%'
    };

    let currentActiveSection = null;

    const updateActiveSection = (id) => {
      if (currentActiveSection !== id) {
        currentActiveSection = id;

        sectionLinks.forEach(link => link.classList.remove('active-section'));

        const correspondingLink = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (correspondingLink) {
          correspondingLink.classList.add('active-section');
        }
      }
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      const intersectingSections = entries.filter(entry => entry.isIntersecting);

      if (intersectingSections.length > 0) {
        const mostVisible = intersectingSections.reduce((prev, current) => {
          return (current.intersectionRatio > prev.intersectionRatio) ? current : prev;
        });

        const id = mostVisible.target.id;
        updateActiveSection(id);
      }
    }, observerOptions);

    sections.forEach(section => {
      if (section.id) {
        sectionObserver.observe(section);
      }
    });

    window.addEventListener('scroll', () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;

      if (pageHeight - scrollPosition < 100) {
        updateActiveSection('contact');
      }
    });
  }

  // Highlight current page link in nav (desktop top bar + mobile pill)
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const allPageLinks = document.querySelectorAll('.nav-links a[href], .mobile-pill-link[href]');
  allPageLinks.forEach(link => {
    const href = link.getAttribute('href');
    // Remove any pre-set active state first
    link.classList.remove('active-section');
    if (href === currentPage || (currentPage === '' && href === 'index.html') || (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active-section');
    }
  });


  // ===========================
  // GSAP SCROLL ANIMATIONS (all pages)
  // ===========================
  const initGSAPScrollAnimations = () => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);

    // 1. Staggered reveals — cards, info boxes, project items, skill cards, course cards, timeline items
    const revealGroups = [
      { parent: '.education-container', children: '.info-box' },
      { parent: '.project-grid', children: '.project-item' },
      { parent: '.courses-grid', children: '.course-category' },
      { parent: '.skills-container', children: '.skill-category-card' },
      { parent: '.featured-grid', children: '.project-item' },
    ];

    revealGroups.forEach(({ parent, children }) => {
      const container = document.querySelector(parent);
      if (!container) return;
      const items = container.querySelectorAll(children);
      if (items.length === 0) return;

      gsap.set(items, { opacity: 0, y: 60 });

      ScrollTrigger.create({
        trigger: container,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out'
          });
        }
      });
    });

    // 2. Clip-path text reveal for section headings (h2)
    const sectionHeadings = document.querySelectorAll('section h2, .education h2, .courses h2, .skills h2, .projects h2, .experience h2');
    sectionHeadings.forEach(h2 => {
      gsap.set(h2, { clipPath: 'inset(0 100% 0 0)' });

      ScrollTrigger.create({
        trigger: h2,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(h2, {
            clipPath: 'inset(0 0% 0 0)',
            duration: 0.8,
            ease: 'power3.out'
          });
        }
      });
    });

    // 3. Parallax depth — section headings move at 0.8x scroll speed
    document.querySelectorAll('section > h2').forEach(h2 => {
      gsap.to(h2, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: h2.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    // 4. Page header reveal (Work + Academics pages)
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader) {
      const h1 = pageHeader.querySelector('h1');
      const sub = pageHeader.querySelector('.page-subtitle');
      if (h1) {
        gsap.fromTo(h1,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' }
        );
      }
      if (sub) {
        gsap.fromTo(sub,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: 'power3.out' }
        );
      }
    }

    // 5. About narrative text reveal (landing page)
    const aboutNarrative = document.querySelector('.about-narrative');
    if (aboutNarrative) {
      const aboutParagraphs = aboutNarrative.querySelectorAll('p');
      if (aboutParagraphs.length > 0) {
        gsap.set(aboutParagraphs, { opacity: 0, y: 40 });
        ScrollTrigger.create({
          trigger: aboutNarrative,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(aboutParagraphs, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.2,
              ease: 'power3.out'
            });
          }
        });
      }
    }

    // 6. Timeline line positioning + cascade (Work page)
    const timelineDots = document.querySelectorAll('.timeline-dot');
    const timelineLine = document.querySelector('.timeline-line');
    const timelineItemsContainer = document.querySelector('.timeline-items');

    if (timelineDots.length > 1 && timelineLine && timelineItemsContainer) {
      // Position line to span from first dot center to last dot center
      const positionLine = () => {
        const containerRect = timelineItemsContainer.getBoundingClientRect();
        const firstDot = timelineDots[0];
        const lastDot = timelineDots[timelineDots.length - 1];
        const firstRect = firstDot.getBoundingClientRect();
        const lastRect = lastDot.getBoundingClientRect();

        const firstCenterX = firstRect.left + firstRect.width / 2 - containerRect.left;
        const lastCenterX = lastRect.left + lastRect.width / 2 - containerRect.left;
        const dotCenterY = firstRect.top + firstRect.height / 2 - containerRect.top;

        timelineLine.style.left = `${firstCenterX}px`;
        timelineLine.style.width = `${lastCenterX - firstCenterX}px`;
        timelineLine.style.top = `${dotCenterY}px`;
      };

      positionLine();
      window.addEventListener('resize', positionLine);

      // Animation
      const timelineItems = document.querySelectorAll('.timeline-item');
      gsap.set(timelineItems, { opacity: 0 });
      gsap.set(timelineLine, { opacity: 0 });

      const timelineContainer = document.querySelector('.timeline-container');
      if (timelineContainer) {
        ScrollTrigger.create({
          trigger: timelineContainer,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            const tl = gsap.timeline();
            tl.to(timelineLine, { opacity: 1, duration: 0.5, ease: 'power2.out' });
            tl.to(timelineItems, {
              opacity: 1,
              duration: 0.5,
              stagger: 0.12,
              ease: 'power3.out'
            }, '-=0.2');
          }
        });
      }
    }

    // 6. Contact/footer reveal
    const footer = document.querySelector('#contact');
    if (footer) {
      gsap.set(footer.children, { opacity: 0, y: 40 });
      ScrollTrigger.create({
        trigger: footer,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.to(footer.children, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out'
          });
        }
      });
    }
  };

  initGSAPScrollAnimations();

  // ===========================
  // 3D CARD TILT (desktop only)
  // ===========================
  const initCardTilt = () => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cards = document.querySelectorAll('.glass-hover');
    if (cards.length === 0) return;

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        // Normalized -0.5 to 0.5
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  };

  initCardTilt();

});
