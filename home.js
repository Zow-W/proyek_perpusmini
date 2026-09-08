//SCROLL BESTSELLER
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('bookSlider');
  if (slider) {
    // Duplikat semua card sekali
    const originalCards = Array.from(slider.children);
    originalCards.forEach(card => {
      slider.appendChild(card.cloneNode(true));
    });
    const originalSetWidth = slider.scrollWidth / 2;

    function autoScrollStep() {
      slider.scrollLeft += 1;
      if (slider.scrollLeft >= originalSetWidth) {
        slider.scrollLeft -= originalSetWidth;
      }
    }

    let autoScroll = setInterval(autoScrollStep, 20);
    slider.addEventListener('mouseenter', () => clearInterval(autoScroll));
    slider.addEventListener('mouseleave', () => {
      autoScroll = setInterval(autoScrollStep, 20);
    });
  }
});