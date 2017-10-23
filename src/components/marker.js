import React from 'react';
import { compose, withProps, withStateHandlers } from "recompose";
import { Marker, InfoWindow, FaAnchor } from "react-google-maps";
import PlaceInfo from './place-info';
import blueIcon from '../icons/blueIcon.png';
import greenIcon from '../icons/greenIcon.png';
import redIcon from '../icons/redIcon.png';
import lightRedIcon from '../icons/orangeIcon.png';

const MarkerComponent = compose(
  withStateHandlers(() => ({
    isOpen: false,
  }), {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen,
      })
    }),
)(({ keyIdentifier, marker, isOpen, onToggleOpen, selected, selectKey }) => {
  // TODO: make sure icons are locals, this url icons are used only for the POC
  function getIcon(marker) {
    const iconStatus = {
      "Not Ready": redIcon,
      "Vacant": greenIcon,
    }

    if (!iconStatus[marker.status] && marker.nextReservation < 2) return lightRedIcon; 
    else if (!iconStatus[marker.status] && marker.nextReservation > 1) return blueIcon;
    return iconStatus[marker.status];
  }

  function onToggle() {
    selectKey(keyIdentifier);
    !isOpen && onToggleOpen();
  }

  return (
    <Marker
      position={{ lat: marker.latitude, lng: marker.longitude }}
      onClick={onToggle}
      icon={getIcon(marker)}
      label={marker.nextReservation + ''}
      title={marker.nextReservation + ''}
    >
      {isOpen && selected === keyIdentifier && <InfoWindow onCloseClick={onToggleOpen}>
        <PlaceInfo place={marker} />
      </InfoWindow>}
    </Marker>
  );
});

MarkerComponent.displayName = 'MarkerComponent';

export default MarkerComponent;