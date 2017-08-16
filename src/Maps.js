import React, { Component } from 'react'

import GoogleReactMap from './GoogleReactMap'
import UberReactMap from './UberReactMap'

class Maps extends Component {
  constructor (props) {
    super(props)
    this.state = {
      location: {
        isAvailable: false,
        latitude: 0.0,
        longitude: 0.0
      }
    }
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

  render () {
    return (
      <div className='parent'>
        <GoogleReactMap location={this.state.location}/>
        <UberReactMap location={this.state.location}/>
      </div>
    )
  }
}

export default Maps
