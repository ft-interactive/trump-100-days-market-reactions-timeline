import * as d3 from 'd3';

export default function drawLineChart(container, indicator) {
  const margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 50,
  };

  const width = container.offsetWidth;
  const height = (width * 9) / 16;

  const svg = d3.select(container).append('svg');

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.right})`);

  const x = d3.scaleTime()
      .rangeRound([0, width]);

  const y = d3.scaleLinear()
    .rangeRound([height, 0]);

  const line = d3.line()
    .x(d => x(d.date))
    .y(d => y(d.value));

  d3.tsv(`./data/${indicator}.tsv`, (error, data) => {
    if (error) throw error;

    let parseTime = d3.timeParse('%-m/%-d/%y');
    if (data[0].Date.includes(':')) {
      parseTime = d3.timeParse('%-m/%-d/%y %H:%M');
    }

    data.forEach((d) => {
      d.date = parseTime(d.Date);
      d.value = +d['Last Price'];
    });

    x.domain(d3.extent(data, d => d.date));
    y.domain(d3.extent(data, d => d.value));

    g.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x))
      .select('.domain')
        .remove();

    g.append('g')
        .call(d3.axisLeft(y))
      .append('text')
        .attr('fill', '#000')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('text-anchor', 'end');

    g.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('stroke-width', 1.5)
        .attr('d', line);
  });
}
