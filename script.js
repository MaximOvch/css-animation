const FLIP_DURATION = 800;  
const HOLD_TIME = 1500;    

document.querySelectorAll('.card').forEach(card => {
  let timeout;

  card.addEventListener('mouseenter', () => {
    clearTimeout(timeout);
    card.classList.add('is-flipped');
  });

  card.addEventListener('mouseleave', () => {
    timeout = setTimeout(() => {
      card.classList.remove('is-flipped');
    }, FLIP_DURATION + HOLD_TIME);
  });
});