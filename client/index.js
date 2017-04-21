import debounce from 'lodash.debounce';
import drawLineChart from './components/chart/line';

function drawCharts() {
  const charts = document.querySelectorAll('.chart');

  Array.from(charts).forEach((chart) => {
    const container = chart.querySelector('.chart_container');
    const indicator = chart.dataset.indicator;

    container.innerHTML = '';
    drawLineChart(container, indicator);
  });
}

drawCharts();

window.addEventListener('resize', () => {
  debounce(drawCharts(), 100);
});
