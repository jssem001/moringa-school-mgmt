// src/Charts/UserBarChart.js
import React, { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { TaskContext } from '../context/TaskContext';

const UserBarChart = () => {
  const { tasks } = useContext(TaskContext);

  // Count tasks per user
  const userTaskCounts = tasks.reduce((acc, task) => {
    const userId = task.user_id;
    if (!acc[userId]) {
      acc[userId] = { user_id: userId, count: 0 };
    }
    acc[userId].count += 1;
    return acc;
  }, {});

  // Convert to array for Recharts
  const data = Object.values(userTaskCounts);

  

  return (
    <div className="user-bar-chart">
      
      <BarChart
        width={450}
        height={300}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="user_id" label={{ value: 'User IDs', position: 'insideBottomCenter', dy: 20 }} />
        <YAxis />
        <Tooltip />
        <Legend layout="horizontal" verticalAlign="bottom" align="center" />
        <Bar dataKey="count" fill="#06b6d4" />
      </BarChart>
    </div>
  );
};

export default UserBarChart;