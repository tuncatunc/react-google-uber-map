import React, { Component } from 'react'

import GoogleReactMap from './GoogleReactMap'
import UberReactMap from './UberReactMap'

class Maps extends Component {
  state = {
    location: {
      isAvailable: false,
      latitude: 0.0,
      longitude: 0.0
    },
    center: {
      latitude: 0.0,
      longitude: 0.0,
      zoom: 10
    }
  }

  constructor (props) {
    super(props)
  }

  
  componentWillMount() {
    this.getLocation();
  }
  
  getLocation  = () => {
    navigator.geolocation.watchPosition((position, err) => {
      if (!err) {
        const location = {
          isAvailable: true,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }

        this.setState({location})
      } else {
        this.setState({location: {isAvailable: false}})
      }
    })
  }

  onMapChange = (center) => {
    const newState = {
      ...center
    }

    this.setState(newState)
  }

  render () {
    return (
      <div className='parent'>
        <GoogleReactMap 
          location={this.state.location} 
          onChange={this.onMapChange} 
          center={this.state.center}/>
        <UberReactMap 
          location={this.state.location} 
          center={this.state.center}
          onChange={this.onMapChange}/>
      </div>
    )
  }
}

export default Maps
