import React, { useState, useEffect } from 'react';
import EventTile from './EventTile';
import booksData from '../book/events.json'; // Ensure the path is correct

const EventsPage = () => {
  const [animatedEvents, setAnimatedEvents] = useState([]);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Shuffle function
  const shuffleArray = (array) => {
    const shuffledArray = array.slice(); // Clone the array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0, // Scroll to the top of the page
      behavior: 'smooth', // Smooth scrolling
    });
  };

  // Effect to handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 100); // Show button if scrolled down more than 100 units
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set shuffled events
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedEvents(shuffleArray(booksData)); // Shuffle the events
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Upcoming Events</h1>
        <div className="events-container">
          {animatedEvents.map((event) => (
            <EventTile key={event.id} event={event} />
          ))}
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`scroll-to-top-button ${showScrollButton ? 'show' : ''}`} // Toggle class based on state
        aria-label="Scroll up"
        tabIndex="0" // Make it keyboard accessible
      >
        ↑
      </button>
    </div>
  );
};

export default EventsPage;
