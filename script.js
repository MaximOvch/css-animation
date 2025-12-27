/* const FLIP_DURATION = 800;  
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
}); */

const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  let timerFlip = null;
  let timerBack = null;
  let pausedByHover = false;

  const flip = () => card.classList.add("is-flipped");
  const back = () => card.classList.remove("is-flipped");

  function clearTimers() {
    clearTimeout(timerFlip);
    clearTimeout(timerBack);
    timerFlip = null;
    timerBack = null;
  }

  function scheduleCycle() {
    clearTimers();

    // случайный старт/интервал 2–4 сек
    const t = 2000 + Math.random() * 2000;

    timerFlip = setTimeout(() => {
      if (pausedByHover) return;

      flip();

      // после переворота держим 2 сек рубашку/лицо (как ты просил)
      timerBack = setTimeout(() => {
        if (!pausedByHover) back();

        // и запускаем следующий цикл
        scheduleCycle();
      }, 2000);
    }, t);
  }

  // Hover: стопаем авто, докручиваем нормально
  card.addEventListener("pointerenter", () => {
    pausedByHover = true;
    clearTimers();
    flip(); // при наведении показать масть
  });

  // Увод курсора: подержать 2 сек и вернуть обратно, потом снова авто
  card.addEventListener("pointerleave", () => {
    timerBack = setTimeout(() => {
      pausedByHover = false;
      back();
      scheduleCycle();
    }, 2000);
  });

  // стартуем авто-режим
  scheduleCycle();
});