import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { sankey, sankeyLinkHorizontal } from "d3-sankey";

const SankeyDiagram = () => {
  const ref = useRef();

  useEffect(() => {
    // Prepare data
    const nodes = [
      // Funding stages
      { name: "Seed" },
      { name: "Series A" },
      { name: "Series B" },
      { name: "Series C" },
      { name: "Series D" },
      // Common activities
      { name: "Product Development & Launch" },
      { name: "Initial Funding Secured" },
      { name: "Social Media Marketing" },
      { name: "Entered Larger Retailers" },
      { name: "Product Line Expansion" },
      { name: "Secured Significant Funding" },
      { name: "Marketing Campaigns" },
      { name: "Partnerships & Collaborations" },
      { name: "Sales Milestones" },
      { name: "International Expansion" },
    ];

    // Create a mapping of names to indices
    const nodeMap = new Map(nodes.map((node, i) => [node.name, i]));

    const links = [
      // Seed stage links
      {
        source: nodeMap.get("Seed"),
        target: nodeMap.get("Product Development & Launch"),
        value: 9,
      },
      {
        source: nodeMap.get("Seed"),
        target: nodeMap.get("Initial Funding Secured"),
        value: 9,
      },
      {
        source: nodeMap.get("Seed"),
        target: nodeMap.get("Social Media Marketing"),
        value: 6,
      },

      // Series A links
      {
        source: nodeMap.get("Series A"),
        target: nodeMap.get("Entered Larger Retailers"),
        value: 8,
      },
      {
        source: nodeMap.get("Series A"),
        target: nodeMap.get("Product Line Expansion"),
        value: 7,
      },
      {
        source: nodeMap.get("Series A"),
        target: nodeMap.get("Secured Significant Funding"),
        value: 9,
      },
      {
        source: nodeMap.get("Series A"),
        target: nodeMap.get("Social Media Marketing"),
        value: 5,
      },

      // Series B links
      {
        source: nodeMap.get("Series B"),
        target: nodeMap.get("Marketing Campaigns"),
        value: 7,
      },
      {
        source: nodeMap.get("Series B"),
        target: nodeMap.get("Partnerships & Collaborations"),
        value: 6,
      },
      {
        source: nodeMap.get("Series B"),
        target: nodeMap.get("Product Line Expansion"),
        value: 5,
      },
      {
        source: nodeMap.get("Series B"),
        target: nodeMap.get("Sales Milestones"),
        value: 5,
      },

      // Series C links
      {
        source: nodeMap.get("Series C"),
        target: nodeMap.get("International Expansion"),
        value: 5,
      },
      {
        source: nodeMap.get("Series C"),
        target: nodeMap.get("Marketing Campaigns"),
        value: 6,
      },
      {
        source: nodeMap.get("Series C"),
        target: nodeMap.get("Partnerships & Collaborations"),
        value: 5,
      },
      {
        source: nodeMap.get("Series C"),
        target: nodeMap.get("Sales Milestones"),
        value: 6,
      },

      // Series D links
      {
        source: nodeMap.get("Series D"),
        target: nodeMap.get("International Expansion"),
        value: 4,
      },
      {
        source: nodeMap.get("Series D"),
        target: nodeMap.get("Marketing Campaigns"),
        value: 5,
      },
      {
        source: nodeMap.get("Series D"),
        target: nodeMap.get("Product Line Expansion"),
        value: 4,
      },
      {
        source: nodeMap.get("Series D"),
        target: nodeMap.get("Sales Milestones"),
        value: 5,
      },
    ];

    const graph = { nodes, links };

    // Create Sankey diagram
    const { nodes: sankeyNodes, links: sankeyLinks } = sankey()
      .nodeWidth(15)
      .nodePadding(10)
      .size([800, 400])(graph);

    const svg = d3.select(ref.current).attr("width", 900).attr("height", 500);

    // Add links
    svg
      .append("g")
      .selectAll(".link")
      .data(sankeyLinks)
      .enter()
      .append("path")
      .attr("d", sankeyLinkHorizontal())
      .attr("stroke-width", (d) => Math.max(1, d.width))
      .style("stroke", "#888")
      .style("fill", "none")
      .append("title")
      .text((d) => `${d.source.name} → ${d.target.name}\n${d.value} brands`);

    // Add nodes
    svg
      .append("g")
      .selectAll(".node")
      .data(sankeyNodes)
      .enter()
      .append("rect")
      .attr("x", (d) => d.x0)
      .attr("y", (d) => d.y0)
      .attr("height", (d) => d.y1 - d.y0)
      .attr("width", (d) => d.x1 - d.x0)
      .style("fill", "#69b3a2")
      .style("stroke", "#000")
      .append("title")
      .text((d) => `${d.name}\n${d.value} brands`);

    // Add node labels
    svg
      .append("g")
      .selectAll(".node")
      .data(sankeyNodes)
      .enter()
      .append("text")
      .attr("x", (d) => d.x0 - 6)
      .attr("y", (d) => (d.y1 + d.y0) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "end")
      .text((d) => d.name)
      .filter((d) => d.x0 < 400)
      .attr("x", (d) => d.x1 + 6)
      .attr("text-anchor", "start");
  }, []);

  return <svg ref={ref}></svg>;
};

export default SankeyDiagram;
