import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const ClicksLineChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const data = [
    { date: new Date('2023-01-01'), clicks: 10 },
    { date: new Date('2023-01-02'), clicks: 20 },
    { date: new Date('2023-01-03'), clicks: 30 },
    { date: new Date('2023-01-04'), clicks: 40 },
  ];

  useEffect(() => {
    const svg = d3.select(svgRef.current!)
      .attr('width', 600)
      .attr('height', 400);

    const x = d3.scaleTime()
      .domain(d3.extent(data, (d) => d.date) as [Date, Date])
      .range([0, 600]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d.clicks)!])
      .range([400, 0]);

    const line = d3.line<any>()
      .x((d) => x(d.date))
      .y((d) => y(d.clicks));

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', line);

    svg.append('g')
      .attr('transform', 'translate(0,400)')
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y));
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default ClicksLineChart;
