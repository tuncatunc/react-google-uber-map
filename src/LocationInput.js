import React, { Component } from 'react'
import axios from 'axios'
import Select from 'react-select'
import debounce  from 'lodash.debounce'

class LocationInput extends Component {
  constructor(props){
    super(props);

    this.state = {
      input: '',
      options: [],
      value: ''
    }
  }

  loadOptions = (address) => {
    
    axios.get('http://maps.googleapis.com/maps/api/geocode/json',
      {
        params: {
          address: address
        }
      })
    .then( response => {
      if (response.data.status !== 'OK') return;

      // remove duplicate from addresses
      const addresses = response.data.results
        .map(result => {
          return {
            label: result.formatted_address, 
            value: result.formatted_address,
            position: {
              latitude: result.geometry.location.lat,
              longitude: result.geometry.location.lng
            }
          };
        })
        .filter(address => this.state.options.find(a => a.value === address.value) === undefined )
      
      const next = {
        options: [
          ...this.state.options,
          ...addresses
        ]
      }
      this.setState(next)
    })
  }

  handleChange = (value) => {
    if (!value) return

    this.setState({
      value
    })
    const { position } = value;
    this.props.onLocationChange({position})
  }
  render() {
    return (
      <Select
        options={this.state.options}
        onChange={this.handleChange}
        onInputChange={debounce(this.loadOptions, 1000)}
        value={this.state.value}
      />
    );
  }
}

export default LocationInput;