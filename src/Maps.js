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
        <div style={{width: 400, height: 400}}>
          <GoogleReactMap
          location={this.state.location} 
          onChange={this.onMapChange} 
          onDrag={(drag) => console.log(drag)}
          center={this.state.center}/>
        </div>
        <div>
          <UberReactMap 
          style={{overflow: 'hidden'}}
          location={this.state.location} 
          center={this.state.center}
          onChange={this.onMapChange}/>
        </div>
      </SplitterLayout>
    )
  }
}

export default Maps
