document.addEventListener('DOMContentLoaded', () => {
  // Typed.js Initialization
  if (window.Typed) {
    new Typed('#typewriter', {
      // strings: ["Hello, I'm Ishaan"], // The text to type
      // loop: false,    // Set to true for repeating
      strings: ["Hello, I'm Ishaan", "Mathematician", "Problem Solver", "Researcher"],
      loop: true,
      typeSpeed: 50,  // Typing speed in milliseconds
      backSpeed: 100,  // Backspacing speed (if needed)
      showCursor: false,
    });
  }

  // Menu Icon Toggle
  const menuIcon = document.querySelector('.menu-icon');
  const menu = document.querySelector('.menu');

  menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('active');
    menu.classList.toggle('active');
  });

  // GSAP Animation Example (if needed)
  const projectItems = document.querySelectorAll('.project-item');
  gsap.from(projectItems, {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    scrollTrigger: {
      trigger: '.projects',
      start: 'top bottom',
    },
  });

  // Basic Form Handling
  const form = document.querySelector('.contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message sent!');
    form.reset();
  });
});