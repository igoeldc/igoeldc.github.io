document.addEventListener('DOMContentLoaded', () => {
  // Typed.js Initialization
  if (window.Typed) {
    new Typed('#typewriter', {
      strings: ["Hello, I'm Ishaan", "Mathematician", "Problem Solver", "Researcher"],
      loop: true,
      typeSpeed: 100,  // Typing speed in milliseconds
      backSpeed: 75,  // Backspacing speed (if needed)
      showCursor: true,
      cursorChar: '_',
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
