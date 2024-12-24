document.addEventListener('DOMContentLoaded', () => {
  // Typed.js for hero subtitle
  if (window.Typed) {
    new Typed('#typed-text', {
      strings: ['A Web Developer', 'A Designer', 'A Creator'],
      typeSpeed: 50,
      backSpeed: 25,
      loop: true
    });
  }

  // If using particles or a Three.js scene:
  // Simple example with particles.js (if you have it included):
  // particlesJS.load('hero-canvas', 'myParticleConfig.json', function() {
  //   console.log('Particles loaded');
  // });

  // GSAP animations on scroll (if you want)
  // Example: Fade in projects on scroll
  const projectItems = document.querySelectorAll('.project-item');
  gsap.from(projectItems, {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    scrollTrigger: {
      trigger: '.projects',
      start: 'top bottom'
    }
  });

  // Basic form handling
  const form = document.querySelector('.contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message sent!');
    form.reset();
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const menuIcon = document.querySelector('.menu-icon');
  const menu = document.querySelector('.menu');

  menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('active');
    menu.classList.toggle('active');
  });
});