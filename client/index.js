import drawLineChart from './components/chart/line';

const charts = document.querySelectorAll('.chart');

Array.from(charts).forEach((chart) => {
  const container = chart.querySelector('.chart_container');
  const indicator = chart.dataset.indicator;

  drawLineChart(container, indicator);
});
