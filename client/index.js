/* global Waypoint */

import debounce from 'lodash.debounce';
import drawLineChart from './components/chart/line';
import scrollTo from './components/core/scrollTo';
import gaSendEvent from './components/core/ga-analytics';

let windowWidth = null;
const timelineDots = document.querySelectorAll('.timeline__circle');
const cards = document.querySelectorAll('.card');
let timeCardMarker = null;
let timeOnCard = 0;

function selectCard(card) {
  if (timeCardMarker === null) {
    timeCardMarker = Date.now();
  } else {
    timeOnCard = ((Date.now() - timeCardMarker) / 1000).toFixed(2);
    timeCardMarker = Date.now();
  }

  // old selected card
  const oldSelectedCard = document.querySelector('.card.selected');
  if (oldSelectedCard) {
    const oldSelectedCardId = oldSelectedCard.dataset.cardId;
    const oldSelectedCardDate = oldSelectedCard.querySelector('.card__date__text').innerText;
    if (timeOnCard > 1) {
      gaSendEvent('timeline-timeOnCard', `${oldSelectedCardDate}-${oldSelectedCardId}`, timeOnCard);
    }
  }

  Array.from(cards).forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');

  const cardId = card.dataset.cardId;

  Array.from(timelineDots).forEach(timelineDot => timelineDot.classList.remove('selected'));
  const timelineDot = document.querySelector(`.timeline__circle[data-card-id="${cardId}"]`);
  timelineDot.classList.add('selected');
}

function drawCharts() {
  if (windowWidth === null || windowWidth !== document.documentElement.clientWidth) {
    windowWidth = document.documentElement.clientWidth;

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

      // waypoint down
      new Waypoint({
        element: card,
        handler: (direction) => {
          if (direction === 'down') {
            selectCard(card);
          }
        },
        offset: '50%',
      });

      // waypoint up
      new Waypoint({
        element: card,
        handler: (direction) => {
          if (direction === 'up') {
            selectCard(card);
          }
        },
        offset: '45%',
      });
    });
  }
}

drawCharts();

window.addEventListener('resize', debounce(drawCharts, 100));

window.addEventListener('scroll', () => {
  const containerHeight = document.querySelector('#timeline-wrapper').getBoundingClientRect().bottom - document.querySelector('#timeline-wrapper').getBoundingClientRect().top;
  const containerPosition = document.querySelector('#timeline-wrapper').offsetTop + containerHeight;

  if (window.scrollY > containerPosition) {
    document.querySelector('#timeline-container').classList.add('tacked');
  } else {
    document.querySelector('#timeline-container').classList.remove('tacked');
  }

  // to get time on card for last card on page
  if (window.scrollY > document.querySelector('#timeline-wrapper').offsetTop + document.querySelector('#timeline-card-container').offsetHeight) {
    if (timeCardMarker !== null) {
      timeOnCard = ((Date.now() - timeCardMarker) / 1000).toFixed(2);
      timeCardMarker = null;
      const oldSelectedCard = cards[cards.length - 1];
      const oldSelectedCardId = oldSelectedCard.dataset.cardId;
      const oldSelectedCardDate = oldSelectedCard.querySelector('.card__date__text').innerText;

      Array.from(cards).forEach(c => c.classList.remove('selected'));
      if (timeOnCard > 1) {
        gaSendEvent('timeline-timeOnCard-bottom', `${oldSelectedCardDate}-${oldSelectedCardId}`, timeOnCard);
      }
    }
  }
});

Array.from(timelineDots).forEach((timelineDot) => {
  timelineDot.addEventListener('click', () => {
    const id = timelineDot.dataset.cardId;
    const timelineCardContainerYPos = document.querySelector('#timeline-card-container').offsetTop;
    const viewportHeight = document.documentElement.clientHeight;
    // yPos is position of card within timeline-card-container + position of the timeline-card-container. then subtract half height of screen to capture waypoint (and a tiny bit more to capture waypoint)
    const yPos = document.querySelector(`.card[data-card-id="${id}"]`).offsetTop + (timelineCardContainerYPos - ((viewportHeight / 2) - 50));
    scrollTo(yPos, 500);

    const textDate = timelineDot.querySelector('.timeline__circle__text-date').innerText;
    gaSendEvent('timeline', 'click', textDate);
  });
});

let timelineVisible = false;
if (document.querySelector('#timeline-wrapper').offsetHeight !== 0) {
  timelineVisible = true;
}
gaSendEvent('timeline', 'visible', timelineVisible);
