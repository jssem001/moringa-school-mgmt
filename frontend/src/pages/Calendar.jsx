import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Calendar from 'react-calendar'; // Import react-calendar
import 'react-calendar/dist/Calendar.css'; // Import styles for the calendar
import Sidebar from "../components/Sidebar"; // Import the Sidebar component

// Mock data for events
const mockEvents = [
  { id: 1, title: "Project Deadline 1", date: "2024-08-05", description: "Complete the project report." },
  { id: 2, title: "Project Deadline 2", date: "2024-08-07", description: "Submit the project presentation slides." },
  { id: 3, title: "Meeting with Team", date: "2024-08-10", description: "Discuss the project progress." },
];

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Simulate fetching events on component mount
  useEffect(() => {
    try {
      // Simulate fetching data
      setEvents(mockEvents);
    } catch (error) {
      setError(error.message || "Failed to fetch events");
      toast.error(error.message || "Failed to fetch events");
    } finally {
      setLoading(false);
    }
  }, []);

  // Filter events within the next 7 days
  const getUpcomingEvents = () => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= today && eventDate <= nextWeek;
    });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const upcomingEvents = getUpcomingEvents();

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 ml-64 p-6 bg-gray-100">
        {/* Header with Google Calendar Icon */}
        <header className="flex flex-col items-center mb-6">
          <a
            href="https://calendar.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mb-4"
          >
            <img
              src="https://img.icons8.com/external-flat-juicy-fish/64/external-google-calendar-flat-flat-juicy-fish.png"
              alt="Google Calendar"
              className="w-16 h-16"
            />
          </a>
          <h1 className="text-3xl font-bold text-gray-800">Calendar & Deadlines</h1>
        </header>

        {/* Calendar and Deadlines */}
        <div className="space-y-6">
          {/* Calendar */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Interactive Calendar</h2>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              className="react-calendar"
            />
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Upcoming Deadlines</h2>
            {upcomingEvents.length > 0 ? (
              <ul className="space-y-4">
                {upcomingEvents.map((event) => (
                  <li key={event.id} className="border p-4 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold">{event.title}</h3>
                    <p className="text-gray-600">{event.date}</p>
                    <p className="mt-2">{event.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No deadlines within the next 7 days.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CalendarPage;
