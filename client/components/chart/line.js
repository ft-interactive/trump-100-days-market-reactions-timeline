import * as d3 from 'd3';

export default function drawLineChart(container, indicator, start, end, chartpoint, xAxisHighlight, xAxisHighlightText, yAxisHighlight) {
  const margin = {
    top: 0,
    right: 25,
    bottom: 50,
    left: 5,
  };

  const width = container.offsetWidth;
  const height = (width * 9) / 16;

  const svg = d3.select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.right})`);

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

    if (start && end) {
      data = data.filter(d => new Date(d.date) >= new Date(start) && new Date(d.date) <= new Date(end));
    }

    const y = d3.scaleLinear()
      .domain(d3.extent(data, d => d.value))
      .rangeRound([height - margin.top - margin.bottom, 0])
      .nice(5);

    const yAxis = d3.axisRight(y)
      .ticks(5)
      .tickSizeInner(width - margin.left - margin.right)
      .tickSizeOuter(0);

    const yLabel = g.append('g')
        .attr('class', 'yAxis')
        .call(yAxis);

    yLabel.select('.domain')
        .remove();

    const yLabelOffset = d3.select(yLabel.node()).select('text').node().getBBox().width;

    yLabel.selectAll('text')
      .attr('x', width - margin.left - margin.right - yLabelOffset + 10);

    yLabel.selectAll('line')
      .attr('x2', width - margin.left - margin.right - yLabelOffset + 5);

    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date))
      .rangeRound([0, width - margin.left - margin.right - yLabelOffset]);

    const xAxisTicks = x.ticks(5);

    const xAxis = d3.axisBottom(x)
      .ticks(5)
      .tickSizeOuter(5)
      .tickFormat((d, i) => {
        if (indicator.indexOf('intraday') > -1) {
          if (i === 0) {
            return d3.timeFormat('%b %-d')(d);
          }
          return d3.timeFormat('%H:%M')(d);
        }
        if (i === 0 || i === xAxisTicks.length - 1) {
          return d3.timeFormat('%b ’%y')(d);
        }
        return d3.timeFormat('%b')(d);
      });

    g.append('g')
        .attr('class', 'xAxis')
        .attr('transform', `translate(0, ${height - margin.top - margin.bottom})`)
        .call(xAxis)
      .select('.domain')
        .remove();

    if (xAxisHighlight) {
      g.append('line')
        .attr('class', 'yAxisHighlight')
        .attr('x1', x(new Date(xAxisHighlight)))
        .attr('x2', x(new Date(xAxisHighlight)))
        .attr('y1', 0)
        .attr('y2', height - margin.bottom);

      if (xAxisHighlightText) {
        g.append('text')
          .attr('class', 'xAxisHighlightText')
          .attr('x', x(new Date(xAxisHighlight)))
          .attr('y', -5)
          .attr('text-anchor', 'middle')
          .text(xAxisHighlightText);
      }
    }

    if (yAxisHighlight) {
      g.append('line')
        .attr('class', 'yAxisHighlight')
        .attr('x1', 0)
        .attr('x2', width - margin.left - margin.right - yLabelOffset + 5)
        .attr('y1', y(yAxisHighlight))
        .attr('y2', y(yAxisHighlight));
    }

    const line = d3.line()
      .x(d => x(d.date))
      .y(d => y(d.value));

    g.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#A5526A')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('stroke-width', 2.5)
        .attr('d', line);

    if (chartpoint) {
      g.append('circle')
        .attr('r', 3)
        .attr('cx', x(new Date(chartpoint)))
        .attr('cy', y(yAxisHighlight))
        .attr('stroke', '#ff7f8a')
        .attr('stroke-width', 3)
        .attr('fill', '#FDF8F2');
    }
  });
}
