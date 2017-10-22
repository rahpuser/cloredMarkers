import React from 'react';
import { compose, withProps, withStateHandlers } from "recompose";
import { Marker, InfoWindow, FaAnchor } from "react-google-maps";
import PlaceInfo from './place-info';

const MarkerComponent = compose(
  withStateHandlers(() => ({
    isOpen: false,
  }), {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen,
      })
    }),
)(({marker, onToggleOpen, isOpen}) => {
  // TODO: make sure icons are locals, this url icons are used only for the POC
  const iconStatus = {
    "Not Ready": "https://mt.googleapis.com/vt/icon/name=icons/onion/22-blue-dot.png",
    "Occupied": "https://www.toymaster.co.uk/wp-content/themes/toymaster-2016/a/img/map/marker-red.png",
    "Vacant": "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
  }
  return (
    <Marker position={{ lat: marker.latitude, lng: marker.longitude }} onClick={onToggleOpen} icon={iconStatus[marker.status]}>
      {isOpen && <InfoWindow onCloseClick={onToggleOpen}>
        <PlaceInfo place={marker}/>
      </InfoWindow>}
    </Marker>
  );
});

MarkerComponent.displayName = 'MarkerComponent';

export default MarkerComponent;