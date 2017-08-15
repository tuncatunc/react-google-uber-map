import React, { Component } from 'react'
import GoogleMap from 'google-map-react'
import ReactMapGL from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

class Maps extends Component {
  constructor (props) {
    super(props)
    this.state = {
      location: {
        isAvailable: false,
        latitude: 0.0,
        longitude: 0.0
      },
      googleMapState: {
        center: [59.938043, 30.337157],
        zoom: 9,
        greatPlaceCoords: {lat: 59.724465, lng: 30.080121}
      },
      mapBoxMapState: {
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
  }

  getLocation () {
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

  componentDidMount () {
    window.addEventListener('resize', this.resize)
    this.resize()
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.resize)
  }

  resize =  () => {
    const nextState = {
      mapBoxMapState: {
        ...this.state.mapBoxMapState,
        viewport: {
          ...this.state.mapBoxMapState.viewport,
          width: this.state.mapBoxMapState.width || window.innerWidth,
          height: this.state.mapBoxMapState.height || window.innerHeight
        }
      }
    }

    this.setState(nextState)
  }

  onStyleChange = mapStyle => {
    this.setState({
      ...this.state.mapBoxMapState,
      mapBoxMapState: { 
        ...this.state.mapBoxMapState,
        mapStyle 
      }
    })
  }

  onViewportChange = viewport => {
    this.setState({
      ...this.state.mapBoxMapState,
      mapBoxMapState: {
        ...this.state.mapBoxMapState,
        viewport
      }
    })
  }

  render () {
    const { mapStyle, viewport } = this.state.mapBoxMapState
    return (
      <div className='parent'>
        <div className="child">
          <GoogleMap
            // apiKey={YOUR_GOOGLE_MAP_API_KEY} // set if you need stats etc ...
            center={this.state.googleMapState.center}
            zoom={this.state.googleMapState.zoom}>
          </GoogleMap>
        </div>
        <div className="child">
          <ReactMapGL
            {...viewport}
            mapStyle={mapStyle}
            onViewportChange={this.onViewportChange}
            onStyleChange={this.onStyleChange}
            mapboxApiAccessToken={'pk.eyJ1IjoidHVuY2F0dW5jIiwiYSI6IkY2a2l5RlUifQ.YHooFKZuzsNjmMK0mzPUYw'} >
          </ReactMapGL>
        </div>
      </div>
    )
  }
}

export default Maps
