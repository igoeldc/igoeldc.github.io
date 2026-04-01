/**
 * Academics page script — Lemma
 * Floating math symbols canvas
 */

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('academicsCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;

  function resize() {
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;
  }
  resize();
  window.addEventListener('resize', resize);

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const mathSymbols = [
    '∫', '∑', 'π', '∞', '∂', 'λ', 'α', 'β', 'γ', 'δ', 'θ', 'μ', 'σ', 'φ', 'ω',
    '√', '∇', '≈', '≡', '∈', '∪', '∩', '⊂', '∀', '∃', 'ℝ', 'ℂ', 'ℕ', 'ℤ',
    'ε', 'ρ', 'τ', 'Δ', 'Σ', 'Π', 'Λ', '⊗', '⊕', '≤', '≥', '≠', '∅', '⇒', 'ℚ',
    'ξ', 'ψ', 'Ω', 'Γ', 'ζ', '∝', '⊆', '∬', '∮', 'ℵ',
    'κ', 'η', '±', '∧', '∨', '¬', '⇔'
  ];

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
  const MAX_SYMBOLS = isMobile ? 15 : 25;

  const symbols = [];

  class FloatingSymbol {
    constructor() {
      this.x = Math.random() * width;
      this.y = -30;
      this.symbol = mathSymbols[Math.floor(Math.random() * mathSymbols.length)];
      this.speed = 0.4 + Math.random() * 0.6;
      this.opacity = 0;
      this.rotation = 0;
      this.rotationSpeed = (Math.random() - 0.5) * 0.02;
      this.size = 18 + Math.random() * 16;
      this.maxOpacity = 0.25 + Math.random() * 0.25;
    }

    update() {
      this.y += this.speed;
      this.rotation += this.rotationSpeed;

      if (this.y < 200 && this.opacity < this.maxOpacity) {
        this.opacity += 0.008;
      }
      if (this.y > height - 60) {
        this.opacity -= 0.01;
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.font = `${this.size}px "Times New Roman", serif`;
      ctx.fillStyle = `rgba(255, 153, 51, ${this.opacity})`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.symbol, 0, 0);
      ctx.restore();
    }

    isDead() {
      return this.y > height + 30 || this.opacity <= 0;
    }
  }

  setInterval(() => {
    if (symbols.length < MAX_SYMBOLS) {
      symbols.push(new FloatingSymbol());
    }
  }, 700);

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = symbols.length - 1; i >= 0; i--) {
      symbols[i].update();
      symbols[i].draw();
      if (symbols[i].isDead()) {
        symbols.splice(i, 1);
      }
    }

    requestAnimationFrame(animate);
  }

  if (typeof IntersectionObserver !== 'undefined') {
    let running = false;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !running) {
        running = true;
        animate();
      }
    }, { threshold: 0 });
    observer.observe(canvas);
  } else {
    animate();
  }
});
