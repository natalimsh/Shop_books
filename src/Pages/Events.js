import React, { useState, useEffect } from 'react';
import EventTile from './EventTile';
import booksData from '../book/events.json'; // Ensure the path is correct

const EventsPage = () => {
  const [animatedEvents, setAnimatedEvents] = useState([]);

  // Shuffle function
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedEvents(shuffleArray([...booksData])); // Shuffle the events
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Upcoming Events</h1>
        <div className="events-container">
          {animatedEvents.map((event) => (
            <EventTile key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
