import React from 'react';
import { compose, withProps, withStateHandlers } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, InfoWindow, FaAnchor } from "react-google-maps";
import Marker from './marker';

const Map = compose(
  withProps({
    googleMapURL: // TODO 
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyB1dpYuQgvLk8Nlu9fKLIABlUuquIUtCwM&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  const { markers = [], center } = props;
  if (!center) {
    return null;
  }
  return (
    <GoogleMap defaultZoom={7} defaultCenter={center}>
      {
        markers.map((marker) => {
          return (
            <Marker key={marker.id} marker={marker} keyIdentifier={marker.id} selected={props.selected} selectKey={props.selectKey}/>
          )
        })
      }
    </GoogleMap>
  );
});

Map.displayName = 'Map';

export default Map;