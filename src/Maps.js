import React, { Component } from 'react'
import SplitterLayout from 'react-splitter-layout'

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

  componentWillReceiveProps(nextProps) {
    const next = {
      center: {
        ...this.state.center,
        latitude: nextProps.selectedLocation.position.latitude,
        longitude: nextProps.selectedLocation.position.longitude,
      }
    }

    this.setState(next)
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
      <SplitterLayout vertical={true} customClassName={'map-panel'}>
        <div>
          <UberReactMap 
          location={this.state.location} 
          center={this.state.center}
          onChange={this.onMapChange}/>
        </div>
        <div style={{width: '100%', height: '100%'}}>
          <GoogleReactMap
          location={this.state.location} 
          onChange={this.onMapChange} 
          onDrag={(drag) => console.log(drag)}
          center={this.state.center}/>
        </div>
      </SplitterLayout>
    )
  }
}

export default Maps
