import React from 'react';
import moment from 'moment';

function PlaceInfo({ place }) {
  if (!place) {
    return null;
  }
  const nextDate = moment(new Date());
  nextDate.add(place.nextReservation, 'days');

  return (
    <div className="infoContainer">
      <div><b>ID</b>: {place.id}</div>
      <div><b>Address</b>: {place.address}</div>
      <div><b>Next Reservation</b>: {nextDate.format("dddd, MMMM Do YYYY")} </div>
      <div><b>Status</b>: {place.status}</div>
      {place.status === 'Not Ready' && <div><a href="http://www.google.com" target="_blank">Click me!</a></div>}
    </div>
  );
}

export default PlaceInfo;