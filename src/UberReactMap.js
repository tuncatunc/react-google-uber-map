import MapGL, { NavigationControl, Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import React, { Component } from 'react'
import ControlPanel from './ControlPanel'
import LocationPin from './LocationPin'

import locationHistory from './data/transform-location-history.js'

class UberReactMap extends Component {

  navStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px'
  };

  labelStyle = {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: '10px'
    
  }

  constructor (props) {
    super(props)

    this.state = {
      //mapStyle: 'mapbox://styles/mapbox/traffic-night-v2',
      mapStyle: 'mapbox://styles/mapbox/streets-v9',
      viewport: {
        latitude: 37.805,
        longitude: -122.447,
        zoom: 9,
        bearing: 0,
        pitch: 0,
        width: 100,
        height: 100
      },
      location: {
        latitude: 0,
        longitude: 0
      }
    }
  }

  componentDidMount () {
    window.addEventListener('resize', this.resize)
    this.resize()
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.resize)
  }

  resize =  () => {
    const nextState = {
        viewport: {
          ...this.state.viewport,
          width: window.innerWidth || this.state.viewport.width ,
          height: window.innerHeight || this.state.viewport.height
        }
    }

    this.setState(nextState)
  }

  onStyleChange = mapStyle => {
    this.setState({ mapStyle  })
  }

  onViewportChange = viewport => {
    this.setState({ viewport })
    this.props.onChange({
      center: {
        latitude: viewport.latitude,
        longitude: viewport.longitude,
        zoom: viewport.zoom
      }
    })
  }

  componentWillReceiveProps(nextProps) {
      if (nextProps.location.isAvailable){
        this.setState({
          viewport : {
            ...this.state.viewport, 
            latitude: nextProps.location.latitude,
            longitude: nextProps.location.longitude
          },
          location: {
            latitude: nextProps.location.latitude,
            longitude: nextProps.location.longitude
          }
        }
      )

      // Center of the map has changed
      this.setState({
        viewport: {
          ...this.state.viewport,
          ...nextProps.center
        }
      })
    }
  }
  
  onStyleChange = (style) => {
    console.log('Style changed to', style)
    this.setState({mapStyle: style})
  }
  render () {
    const { mapStyle, viewport } = this.state

    return (
      <MapGL
        {...viewport}
        mapStyle={mapStyle}
        onViewportChange={this.onViewportChange}
        onStyleChange={this.onStyleChange}
        mapboxApiAccessToken={'pk.eyJ1IjoidHVuY2F0dW5jIiwiYSI6IkY2a2l5RlUifQ.YHooFKZuzsNjmMK0mzPUYw'} >
        <div style={this.navStyle}>
          <NavigationControl  onViewportChange={this.onViewportChange} />
        </div>
        <ControlPanel onStyleChange={this.onStyleChange}/>
        {
        //   locationHistory.map((location, index) =>
        //     <Marker 
        //       key={index}
        //       latitude={location.latitude} 
        //       longitude={location.longitude} offsetLeft={-20} offsetTop={-10}>
        //       <div>
        //         <LocationPin></LocationPin>
        //       </div>
        //     </Marker>
        //   )
        }
        <Marker 
          latitude={this.state.location.latitude} 
          longitude={this.state.location.longitude} offsetLeft={-20} offsetTop={-10}>
          <div>
            <LocationPin></LocationPin>
          </div>
        </Marker>
      </MapGL>
    )
  }
}

export default UberReactMap
