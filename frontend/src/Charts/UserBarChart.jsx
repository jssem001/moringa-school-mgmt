import React, { useContext, useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { TaskContext } from '../context/TaskContext';

const UserBarChart = () => {
  const { tasks, fetchUserById } = useContext(TaskContext);
  const [userTaskData, setUserTaskData] = useState([]);
  const [userNames, setUserNames] = useState({});

  useEffect(() => {
    // Helper function to fetch user names by IDs
    const fetchUserNames = async () => {
      // Extract unique user IDs
      const userIds = [...new Set(tasks.map(task => task.user_id))];
      
      // Fetch user details for each ID
      const userFetches = userIds.map(userId =>
        fetchUserById(userId)
          .then(user => ({ id: user.id, name: user.name }))
      );
      
      try {
        const users = await Promise.all(userFetches);
        const userNameMap = users.reduce((acc, user) => {
          if (user) {
            acc[user.id] = user.name;
          }
          return acc;
        }, {});
        setUserNames(userNameMap);
      } catch (error) {
        console.error('Failed to fetch user names:', error);
      }
    };

    fetchUserNames();
  }, [tasks, fetchUserById]);

  // Count tasks per user and map user names
  useEffect(() => {
    const userTaskCounts = tasks.reduce((acc, task) => {
      const userId = task.user_id;
      if (!acc[userId]) {
        acc[userId] = { user_id: userId, count: 0 };
      }
      acc[userId].count += 1;
      return acc;
    }, {});

    // Convert to array and map user names
    const data = Object.values(userTaskCounts).map(item => ({
      ...item,
      user_name: userNames[item.user_id] || 'Unknown'
    }));

    setUserTaskData(data);
  }, [tasks, userNames]);











  // // Count tasks per user
  // const userTaskCounts = tasks.reduce((acc, task) => {
  //   const userId = task.user_id;
  //   if (!acc[userId]) {
  //     acc[userId] = { user_id: userId, count: 0 };
  //   }
  //   acc[userId].count += 1;
  //   return acc;
  // }, {});

  // // Convert to array for Recharts
  // const data = Object.values(userTaskCounts);

  

  return (
    <div className="user-bar-chart">
      
      <BarChart
        width={450}
        height={300}
        data={userTaskData}
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