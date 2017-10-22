import React, { Component } from 'react';
import Map from './components/map';
import $ from "jquery";
import './App.css';

function avaragePoint(list) {
  const sum = list.reduce((sum, point) => {
    sum[0] += point.longitude;
    sum[1] += point.latitude;
    return sum;
  }, [0,0])

  return {
    lat: sum[1]/list.length,
    lng: sum[0]/list.length,
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
    }
  }
  componentDidMount() {
    $.getJSON('https://api.rentlever.com/rentals/state?token=c0663781fe2380cddc6ee0c64e10b98c').then((markers) => {
      // fake lat and long for each value
      // results.forEach((result) => {
      //   const fakePoint = generatePoint(100000, -34, 150);
      //   Object.assign(result, fakePoint);
      // });
      const center = avaragePoint(markers);
      this.setState({
        markers,
        center,
      });
    });
  }

  render() {
    return (
      <div className="App">
        <p className="App-intro">
          POC using react and google maps to list rentlever markers
        </p>
        <Map markers={this.state.markers} center={this.state.center}/>
      </div>
    );
  }
}

export default App;
