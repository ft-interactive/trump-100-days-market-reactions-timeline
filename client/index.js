import debounce from 'lodash.debounce';
import drawLineChart from './components/chart/line';

function drawCharts() {
  const cards = document.querySelectorAll('.card');
  const timelineDots = document.querySelectorAll('.timeline__circle');

  Array.from(cards).forEach((card) => {
    const container = card.querySelector('.chart_container');
    if (card.querySelector('.chart')) {
      const indicator = card.querySelector('.chart').dataset.indicator;

      container.innerHTML = '';
      drawLineChart(container, indicator);
    }

    const waypoint = new Waypoint({
      element: card,
      handler: () => {
        Array.from(cards).forEach(card => card.classList.remove('selected'));
        card.classList.add('selected');

        const cardId = card.dataset.cardId;

        Array.from(timelineDots).forEach(timelineDot => timelineDot.classList.remove('selected'));
        const timelineDot = document.querySelector(`.timeline__circle[data-card-id="${cardId}"]`);
        timelineDot.classList.add('selected');
      },
      offset: '50%',
    });
  });
}

drawCharts();

window.addEventListener('resize', () => {
  debounce(drawCharts(), 100);
});

window.addEventListener('scroll', () => {
  const containerHeight = document.querySelector('#timeline-wrapper').getBoundingClientRect().bottom - document.querySelector('#timeline-wrapper').getBoundingClientRect().top;
  const containerPosition = document.querySelector('#timeline-wrapper').offsetTop + containerHeight;

  if (window.scrollY > containerPosition) {
    document.querySelector('#timeline-container').classList.add('tacked');
  } else {
    document.querySelector('#timeline-container').classList.remove('tacked');
  }
});
