const screens = Array.from(document.querySelectorAll('.story-screen'));
const questionCards = document.querySelectorAll('.question-card');

function showScreen(index) {
  screens.forEach((screen, i) => {
    screen.classList.toggle('active', i === index);
  });
}

questionCards.forEach((card) => {
  const buttons = card.querySelectorAll('.option-btn');
  const revealCard = card.querySelector('[data-reveal-card]');
  const nextButton = card.querySelector('.next-btn');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((btn) => btn.classList.remove('selected'));
      button.classList.add('selected');
      revealCard.classList.remove('hidden');
      if (nextButton) {
        nextButton.style.display = 'inline-flex';
      }
    });
  });
});

const nextButtons = document.querySelectorAll('[data-next]');
nextButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const nextIndex = Number(button.dataset.next);
    if (!Number.isNaN(nextIndex)) {
      showScreen(nextIndex);
    }
  });
});

const envelope = document.querySelector('.letter-envelope');
const confettiLayer = document.querySelector('.confetti-layer');

function createBurst(x, y) {
  const colors = ['#ff4f8b', '#ffd166', '#ff8fab', '#f9f7ff', '#7bdff2', '#9ae66e'];
  const heartSymbols = ['❤', '♥', '💗', '💖'];

  for (let i = 0; i < 16; i += 1) {
    const heart = document.createElement('div');
    heart.className = 'heart-particle';
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.setProperty('--dx', `${(Math.random() - 0.5) * 210}px`);
    heart.style.setProperty('--dy', `${-30 - Math.random() * 200}px`);
    heart.style.setProperty('--rot', `${(Math.random() - 0.5) * 200}deg`);
    confettiLayer.appendChild(heart);

    const confetti = document.createElement('div');
    confetti.className = 'confetti-piece';
    confetti.style.left = `${x}px`;
    confetti.style.top = `${y}px`;
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.setProperty('--dx', `${(Math.random() - 0.5) * 220}px`);
    confetti.style.setProperty('--dy', `${-10 - Math.random() * 220}px`);
    confetti.style.setProperty('--rot', `${(Math.random() - 0.5) * 360}deg`);
    confettiLayer.appendChild(confetti);
  }

  setTimeout(() => {
    confettiLayer.querySelectorAll('.heart-particle, .confetti-piece').forEach((node) => {
      if (node.getBoundingClientRect().width > 0) {
        node.remove();
      }
    });
  }, 2600);
}

if (envelope) {
  const toggleLetter = (event) => {
    const rect = envelope.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    createBurst(x, y);
    envelope.classList.toggle('open');
    envelope.setAttribute(
      'aria-label',
      envelope.classList.contains('open') ? 'Birthday letter opened' : 'Open the birthday letter'
    );

    if (event && event.stopPropagation) {
      event.stopPropagation();
    }
  };

  envelope.addEventListener('click', toggleLetter);
  envelope.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleLetter(event);
    }
  });
}
