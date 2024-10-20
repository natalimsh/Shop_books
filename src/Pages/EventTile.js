// C:\Users\admin\444\src\Pages\EventTile.js

import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import './EventTile.css'; // Make sure this path is correct

const EventTile = ({ event }) => {
  return (
    <div className="event-tile">
      <img src={event.image} alt={event.title} className="event-image" />
      <div className="event-details">
        <h2 className="event-title">{event.title}</h2>
        <p className="event-date-time">{`${event.date}, ${event.time}`}</p>
        <p className="event-location">{event.location}</p>
        <p className="event-description">{event.description}</p>
      </div>
    </div>
  );
};

// Define prop types for the event prop
EventTile.propTypes = {
  event: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventTile;
