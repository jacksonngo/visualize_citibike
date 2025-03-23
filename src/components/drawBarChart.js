
import * as d3 from "d3";


export let drawBarChart = (barChartLayer, data, xScale, yScale, barChartWidth, barChartHeight) => {
  const svgRoot = d3.select('svg');

    //Task 7: Complete the code to draw the bars
    //Hint:
    //1. The bars are drawn as rectangles
    barChartLayer.selectAll('.bar')
    .data(data)
      .enter()
      .append('rect')
      .attr('class', d => `bar ${d.station.replace(/[^a-zA-Z]/g, "")}`)
      .attr('x', d => xScale(d.station))
      .attr('y', d => yScale(d.start))
      .attr('width', xScale.bandwidth()) 
      .attr('height', d => barChartHeight - yScale(d.start))
      .style("fill", 'steelblue')
      .style("stroke", "black")
      .style("stroke-width", 1)
    //2. Add a mouseover event to the bar
      .on('mouseover', (event, d ) => {
        d3.select(event.target)
          .style('fill', 'red')
    

    //3. The mouseover event should also highlight the corresponding points in the scatter plot
        svgRoot.append('rect')
          .attr('class', `highlight-rect ${d.station.replace(/[^a-zA-Z]/g, "")}`)
          .attr('x', 35) 
          .attr('y', 20) 
          .attr('width', 545) 
          .attr('height', 360)  
          .style('fill', 'yellow')
          .style('opacity', 0.5);

        d3.selectAll(`.point.${d.station.replace(/[^a-zA-Z]/g, "")}`)
          .style('fill', 'red') 
          .attr('r', 10)
          .raise();   
    })
    //4. The mouseout event should remove the highlight from the corresponding points in the scatter plot 
    .on('mouseout', (event, d ) => {
      d3.select(event.target)
        .style('fill', 'steelblue')

      svgRoot.selectAll(`.highlight-rect.${d.station.replace(/[^a-zA-Z]/g, "")}`).remove();
    
      d3.selectAll(`.point.${d.station.replace(/[^a-zA-Z]/g, "")}`)
        .attr('r', 5)
        .style('fill', 'steelblue');
    })
    //5. You can refer to the code in the drawScatterPlot function 

    //Task 8: Connect the bar chart with the scatter plot
    //Hint:
    //1. Add a mouseover event to the bar
    //2. The mouseover event should also highlight the corresponding points in the scatter plot
  }