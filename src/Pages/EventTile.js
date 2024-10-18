// C:\Users\admin\444\src\Pages\EventTile.js

import React from 'react';
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
        {event.speaker && <p className="event-speaker">Speaker: {event.speaker}</p>}
      </div>
    </div>
  );
};

export default EventTile;
