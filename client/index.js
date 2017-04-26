import debounce from 'lodash.debounce';
import drawLineChart from './components/chart/line';

function drawCharts() {
  const cards = document.querySelectorAll('.card');
  const timelineDots = document.querySelectorAll('.timeline__circle');

  Array.from(cards).forEach((card) => {
    const container = card.querySelector('.chart_container');
    if (card.querySelector('.chart')) {
      const indicator = card.querySelector('.chart').dataset.indicator;
      const startdate = card.querySelector('.chart').dataset.start;
      const enddate = card.querySelector('.chart').dataset.end;
      const chartpoint = card.querySelector('.chart').dataset.chartpoint;
      const xAxisHighlight = card.querySelector('.chart').dataset.xaxishighlight;
      const xAxisHighlightText = card.querySelector('.chart').dataset.xaxishighlighttext;
      const yAxisHighlight = card.querySelector('.chart').dataset.yaxishighlight;

      container.innerHTML = '';
      drawLineChart(container, indicator, startdate, enddate, chartpoint, xAxisHighlight, xAxisHighlightText, yAxisHighlight);
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

// const timelineDots = document.querySelectorAll('.timeline__circle');
// Array.from(timelineDots).forEach((timelineDot) => {
//   timelineDot.addEventListener('click', () => {
//     const id = timelineDot.dataset.cardId;
//     const yPos = document.querySelector(`.card[data-card-id="${id}"]`).offsetTop;
//     window.scrollTo(0, yPos);
//   });
// });
