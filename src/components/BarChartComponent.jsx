"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const BarChartComponent = () => {
  const activitiesData = [
    {
      activity: "Product Development & Launch",
      "Seed to A": 7,
      "A to B": 0,
      "B to C": 0,
      "C to D": 0,
      "D to E": 0,
      "E to F": 0,
    },
    {
      activity: "Initial Funding Secured",
      "Seed to A": 7,
      "A to B": 0,
      "B to C": 0,
      "C to D": 0,
      "D to E": 0,
      "E to F": 0,
    },
    {
      activity: "Local Market Sales",
      "Seed to A": 5,
      "A to B": 0,
      "B to C": 0,
      "C to D": 0,
      "D to E": 0,
      "E to F": 0,
    },
    {
      activity: "Launched DTC Platform",
      "Seed to A": 4,
      "A to B": 1,
      "B to C": 0,
      "C to D": 0,
      "D to E": 0,
      "E to F": 0,
    },
    {
      activity: "Social Media Marketing",
      "Seed to A": 5,
      "A to B": 2,
      "B to C": 1,
      "C to D": 0,
      "D to E": 0,
      "E to F": 0,
    },
    {
      activity: "Expanded Product Lines",
      "Seed to A": 0,
      "A to B": 6,
      "B to C": 4,
      "C to D": 2,
      "D to E": 0,
      "E to F": 0,
    },
    {
      activity: "Entered Larger Retailers",
      "Seed to A": 0,
      "A to B": 5,
      "B to C": 5,
      "C to D": 3,
      "D to E": 2,
      "E to F": 0,
    },
    {
      activity: "Secured Significant Funding",
      "Seed to A": 0,
      "A to B": 6,
      "B to C": 5,
      "C to D": 4,
      "D to E": 2,
      "E to F": 1,
    },
    {
      activity: "Celebrity Endorsements",
      "Seed to A": 1,
      "A to B": 3,
      "B to C": 4,
      "C to D": 2,
      "D to E": 1,
      "E to F": 0,
    },
    {
      activity: "Large-Scale Marketing Campaigns",
      "Seed to A": 0,
      "A to B": 1,
      "B to C": 3,
      "C to D": 3,
      "D to E": 1,
      "E to F": 1,
    },
    {
      activity: "Partnerships & Collaborations",
      "Seed to A": 0,
      "A to B": 2,
      "B to C": 3,
      "C to D": 3,
      "D to E": 1,
      "E to F": 0,
    },
    {
      activity: "Achieved Sales Milestones",
      "Seed to A": 0,
      "A to B": 1,
      "B to C": 3,
      "C to D": 3,
      "D to E": 2,
      "E to F": 1,
    },
    {
      activity: "International Expansion",
      "Seed to A": 0,
      "A to B": 0,
      "B to C": 2,
      "C to D": 2,
      "D to E": 1,
      "E to F": 0,
    },
    {
      activity: "Awards & Recognitions",
      "Seed to A": 0,
      "A to B": 1,
      "B to C": 2,
      "C to D": 2,
      "D to E": 0,
      "E to F": 0,
    },
  ];

  const stages = ["Seed", "Series A", "Series B", "Series C", "Series D"];

  const transformedData = stages.map((stage) => {
    let obj = { stage };
    activitiesData.forEach((activity) => {
      obj[activity.activity] = activity[stage];
    });
    return obj;
  });

  // Define colors for the bars
  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#8dd1e1",
    "#a4de6c",
    "#d0ed57",
    "#83a6ed",
    "#8e4585",
    "#ff7f50",
    "#ffbb28",
    "#00C49F",
    "#FF8042",
    "#0088FE",
    "#FF00FF",
  ];

  return (
    <div className="overflow-auto">
      <BarChart
        width={900}
        height={500}
        data={transformedData}
        margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
      >
        <XAxis
          dataKey="stage"
          angle={-45}
          textAnchor="end"
          interval={0}
          height={80}
        />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        {activitiesData.map((activity, index) => (
          <Bar
            key={index}
            dataKey={activity.activity}
            stackId="a"
            fill={colors[index % colors.length]}
          />
        ))}
      </BarChart>
    </div>
  );
};
export default BarChartComponent;
