import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const BrowserPieChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const data = [
    { user_browser: 'Chrome', count: 1 },
    { user_browser: 'Firefox', count: 1 },
    { user_browser: 'Edge', count: 1 },
    { user_browser: 'Safari', count: 1 },
  ];

  useEffect(() => {
    const svg = d3.select(svgRef.current!)
      .attr('width', 400)
      .attr('height', 400)
      .append('g')
      .attr('transform', 'translate(200,200)');

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie<any>().value((d) => d.count);
    const arc = d3.arc<d3.PieArcDatum<any>>()
      .innerRadius(50)
      .outerRadius(150);

    const tooltip = d3.select('body').append('div')
      .style('position', 'absolute')
      .style('background', '#fff')
      .style('padding', '5px 10px')
      .style('border', '1px solid #ccc')
      .style('border-radius', '5px')
      .style('display', 'none')
      .style('pointer-events', 'none');

    svg.selectAll('path')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d) => color(d.data.user_browser))
      .style('cursor', 'pointer')
      .on('mouseover', function (event, d) {
        tooltip.style('display', 'inline-block')
          .html(`<strong>${d.data.user_browser}</strong>: ${d.data.count}`);
        d3.select(this)
          .transition()
          .duration(200)
          .attr('d', d3.arc<d3.PieArcDatum<any>>()
            .innerRadius(50)
            .outerRadius(160) as any); // Cast as 'any' to match transition type
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
          .attr('d', arc as any); // Cast as 'any' to match transition type
      });

    svg.selectAll('text')
      .data(pie(data))
      .enter()
      .append('text')
      .attr('transform', (d) => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .text((d) => d.data.user_browser);

  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default BrowserPieChart;
