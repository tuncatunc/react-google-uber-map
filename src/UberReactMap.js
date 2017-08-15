import ReactMapGL, { NavigationControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import React, { Component } from 'react'
import ControlPanel from './ControlPanel'

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
      mapStyle: 'mapbox://styles/mapbox/traffic-night-v2',
      viewport: {
        latitude: 37.805,
        longitude: -122.447,
        zoom: 15.5,
        bearing: 0,
        pitch: 0,
        width: 100,
        height: 100
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
  }

  render () {
    const { mapStyle, viewport } = this.state

    return (
      <div>
        <ReactMapGL
          {...viewport}
          mapStyle={mapStyle}
          onViewportChange={this.onViewportChange}
          onStyleChange={this.onStyleChange}
          mapboxApiAccessToken={'pk.eyJ1IjoidHVuY2F0dW5jIiwiYSI6IkY2a2l5RlUifQ.YHooFKZuzsNjmMK0mzPUYw'} >
          <div style={this.navStyle}>
            <NavigationControl  onViewportChange={this.onViewportChange} />
          </div>
          <ControlPanel containerComponent={this.props.containerComponent} />
        </ReactMapGL>
      </div>
    )
  }
}

export default UberReactMap
