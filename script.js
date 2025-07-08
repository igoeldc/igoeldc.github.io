/**
 * Initializes all the scripts for the portfolio page once the DOM is fully loaded.
 */
document.addEventListener('DOMContentLoaded', () => {

  /**
   * Initializes the typewriter effect in the hero section using Typed.js.
   * It checks if the Typed.js library and the target element exist before running.
   */
  const initTyped = () => {
    const typewriterElement = document.querySelector('#typewriter');
    if (window.Typed && typewriterElement) {
      new Typed('#typewriter', {
        strings: ["Hello, I'm Ishaan", "I'm a Mathematician", "I'm a Problem Solver", "I'm a Researcher"],
        loop: true,
        typeSpeed: 100,      // Speed of typing in milliseconds.
        backSpeed: 75,       // Speed of backspacing in milliseconds.
        showCursor: true,    // Displays the cursor.
        cursorChar: '_',     // Character for the cursor.
      });
    }
  };

  /**
   * Sets up the mobile menu toggle functionality.
   * Toggles the 'active' class on the menu and icon when the icon is clicked.
   */
  const initMenu = () => {
    const menuIcon = document.querySelector('.menu-icon');
    const menu = document.querySelector('.menu');

    if (menuIcon && menu) {
      menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('active');
        menu.classList.toggle('active');
      });
    }
  };

  /**
   * Initializes scroll-triggered animations for project items using GSAP.
   * It checks if the GSAP library is available and if there are project items to animate.
   */
  const initGsapAnimations = () => {
    if (window.gsap) {
      const projectItems = document.querySelectorAll('.project-item');
      if (projectItems.length > 0) {
        gsap.from(projectItems, {
          opacity: 0,
          y: 50,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.projects',
            start: 'top bottom', // Animation starts when the top of the trigger hits the bottom of the viewport
          },
        });
      }
    }
  };

  /**
   * Sets up basic form submission handling for the contact form.
   * Prevents the default submission, shows an alert, and resets the form.
   */
  const initContactForm = () => {
    const form = document.querySelector('.contact-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevents the default form submission behavior.
        alert('Message sent!');
        form.reset();
      });
    }
  };

  // Call all initialization functions to set up the page.
  initTyped();
  initMenu();
  initGsapAnimations();
  initContactForm();
});