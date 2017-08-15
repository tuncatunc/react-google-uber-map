import React, { Component } from 'react'
import ReactMapGL, {NavigationControl, Marker} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import LocationPin from './LocationPin'

export default class Map extends Component {

  constructor(props) {
    super(props)
    this.state = {
      mapStyle: 'mapbox://styles/mapbox/traffic-night-v2',
      viewport: {
        latitude: 37.805,
        longitude: -122.447,
        zoom: 15.5,
        bearing: 0,
        pitch: 0,
        width: 500,
        height: 500
      }
    }
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.resize)
    this.resize()
  }
  
  componentWillUnmount = () => {
    window.removeEventListener('resize', this.resize)
  }
  
  resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: this.props.width || window.innerWidth,
        height: this.props.height || window.innerHeight 
      }
    })
  }

  onViewPortChange = viewport => this.setState({viewport})
  onStyleChange = mapStyle => this.setState({mapStyle})

  render = () => {
    const {viewport, mapStyle} = this.state;
    console.log(process.env.REACT_APP_REACT_APP_MAPBOX_ACCESS_TOKEN)

    return (
      <ReactMapGL
        {...viewport}
        onViewportChange={this.onViewPortChange}
        mapStyle={mapStyle}
        mapboxAccessToken='pk.eyJ1IjoidHVuY2F0dW5jIiwiYSI6IkY2a2l5RlUifQ.YHooFKZuzsNjmMK0mzPUYw'>
          <Marker latitude={this.props.location.latitude} longitude={this.props.location.longitude}>
            <LocationPin/>
          </Marker>
      </ReactMapGL>
    )
  }
}
