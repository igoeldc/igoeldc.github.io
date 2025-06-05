document.addEventListener('DOMContentLoaded', () => {
  // Typed.js Initialization
  if (window.Typed) {
    new Typed('#typewriter', {
      strings: ["Hello, I'm Ishaan", "I'm a Mathematician", "I'm a Problem Solver", "I'm a Researcher"],
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

function layoutTimeline() {
  const spans = document.querySelectorAll('.timeline-span');
  const parse = str => new Date(str + '-01');
  const min = new Date(Math.min(...[...spans].map(s => parse(s.dataset.start))));
  const max = new Date(Math.max(...[...spans].map(s => parse(s.dataset.end))));

  const range = max - min;

  const rows = [];

  spans.forEach(span => {
    const start = parse(span.dataset.start);
    const end = parse(span.dataset.end);
    const midpoint = new Date(start);
    midpoint.setDate(midpoint.getDate() - 15);
    const adjEnd = new Date(end);
    adjEnd.setMonth(adjEnd.getMonth() + 1);

    const leftPercent = ((midpoint - min) / range) * 100;
    const widthPercent = ((adjEnd - start) / range) * 100;

    let row = 0;
    while (rows[row]?.some(e => {
      const s = parse(e.dataset.start);
      const f = parse(e.dataset.end);
      return !(end <= s || start >= f);
    })) row++;

    if (!rows[row]) rows[row] = [];
    rows[row].push(span);

    span.style.left = `${leftPercent}%`;
    span.style.width = `${widthPercent}%`;
    span.style.top = `${-2.5 - row * 2.5}rem`;
    span.innerHTML = `${span.dataset.start}–${span.dataset.end}<br>${span.dataset.role}`;
  });
}

document.addEventListener('DOMContentLoaded', layoutTimeline);