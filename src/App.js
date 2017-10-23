import React, { Component } from 'react';
import Map from './components/map';
import Filter from './components/filter';
import $ from "jquery";
import './App.css';

function avaragePoint(list) {
  const sum = list.reduce((sum, point) => {
    sum[0] += point.longitude;
    sum[1] += point.latitude;
    return sum;
  }, [0, 0])

  return {
    lat: sum[1] / list.length,
    lng: sum[0] / list.length,
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      options: [
        { value: null, label: 'None' },
        { value: 'Not Ready', label: 'Not Ready' },
        { value: 'Vacant', label: 'Vacant' },
        { value: 'Occupied', label: 'Occupied' },
      ],
      filter: null,
      selected: null,
    };

    this.onFilterChange = this.onFilterChange.bind(this);
    this.updateList = this.updateList.bind(this);
    this.selectKey = this.selectKey.bind(this);
  }

  componentDidMount() { // TODO: add env variables loader, so this env variables are loaded on build fase
    this.updateList();
  }

  updateList() {
    $.getJSON('https://api.rentlever.com/rentals/state?token=c0663781fe2380cddc6ee0c64e10b98c').then((markers) => {

      markers = this.state.filter ? markers.filter(marker => marker.status === this.state.filter) : markers;

      const center = avaragePoint(markers);
      this.setState({
        markers,
        center,
      });
    });
  }

  onFilterChange(val) {
    this.setState({
      filter: val.value,
    });
    this.updateList();
  }

  selectKey(selected) {
    this.setState({
      selected,
    });
  }

  render() {
    return (
      <div className="App">
        <div className="filterContainer">
          <Filter filter={this.state.filter} options={this.state.options} onChange={this.onFilterChange} />
        </div>
        <div className="App-body">
          <Map markers={this.state.markers} center={this.state.center} selected={this.state.selected} selectKey={this.selectKey}/>
        </div>
      </div>
    );
  }
}

export default App;
