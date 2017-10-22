import React from 'react';

function PlaceInfo({ place }) {
  if (!place) {
    return null;
  }
  return (
    <div class="infoContainer">
      <div><b>ID</b>: {place.id}</div>
      <div><b>Address</b>: {place.address}</div>
      <div><b>Status</b>: {place.status}</div>
    </div>
  );
}

export default PlaceInfo;