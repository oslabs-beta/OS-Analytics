import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface DataPoint {
  user_os: string;
  count: number;
}

const OSBarChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const data: DataPoint[] = [
    { user_os: 'Windows', count: 3 },
    { user_os: 'MacOS', count: 1 },
  ];

  useEffect(() => {
    const svg = d3.select(svgRef.current!)
      .attr('width', 400)
      .attr('height', 300);

    const x = d3.scaleBand()
      .domain(data.map((d) => d.user_os))
      .range([0, 400])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d.count)!])
      .range([300, 0]);

    const tooltip = d3.select('body').append('div')
      .style('position', 'absolute')
      .style('background', '#fff')
      .style('padding', '5px 10px')
      .style('border', '1px solid #ccc')
      .style('border-radius', '5px')
      .style('display', 'none')
      .style('pointer-events', 'none');

    svg.append('g')
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.user_os)!)
      .attr('y', 300)
      .attr('width', x.bandwidth())
      .attr('height', 0)
      .attr('fill', 'steelblue')
      .style('cursor', 'pointer')
      .on('mouseover', function (event, d) {
        tooltip.style('display', 'inline-block')
          .html(`<strong>${d.user_os}</strong>: ${d.count}`);
        d3.select(this)
          .transition()
          .duration(200)
          .attr('fill', 'darkblue');
      })
      .on('mousemove', function (event) {
        tooltip.style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 20) + 'px');
      })
      .on('mouseout', function () {
        tooltip.style('display', 'none');
        d3.select(this)
          .transition()
          .duration(200)
          .attr('fill', 'steelblue');
      });

    svg.selectAll('rect')
      .transition()
      .duration(800)
      .attr('y', (d) => y((d as DataPoint).count))
      .attr('height', (d) => 300 - y((d as DataPoint).count));

    svg.append('g')
      .attr('transform', 'translate(0,300)')
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y));
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default OSBarChart;
