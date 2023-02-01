const cardsContainer = document.querySelector('.cards-container');
const cards = document.querySelectorAll('.card');

const handleMouseMove = (event) => {
  const { clientX, clientY } = event;
  cards.forEach((card) => {
    // returns relative position of current card in cards container
    const rect = card.getBoundingClientRect();

    // calc x, y position of mouse cursor
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    card.style.setProperty('--xPosition', `${x}px`);
    card.style.setProperty('--yPosition', `${y}px`);
  });
};

cardsContainer.addEventListener('mousemove', handleMouseMove);
