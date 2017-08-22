import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import locationHistory from './data/transform-location-history.js'
import LocationPin from './LocationPin'

class GoogleReactMap extends Component {

  constructor (props) {
    super(props)

    this.state = {
      center: [59.938043, 30.337157],
      zoom: 9,
      yourHereCoords: {lat: 59.724465, lng: 30.080121}
    }
  }

  componentWillReceiveProps (nextProps) {
    const yourHereCoords =
      nextProps.location.isAvailable
        ? {lat: nextProps.location.latitude, lng: nextProps.location.longitude}
        : {lat: 0, lng: 0}

    const center = [nextProps.center.latitude, nextProps.center.longitude];
    this.setState({center, yourHereCoords})
  }

  onChange = (change) => {
    this.props.onChange(
      {
        center: {
          latitude: change.center.lat,
          longitude: change.center.lng,
          zoom: change.zoom
        }
      })
  }

  render () {
    return (
      <GoogleMapReact
        // apiKey={YOUR_GOOGLE_MAP_API_KEY} // set if you need stats etc ...
        center={this.state.center}
        zoom={this.state.zoom}
        onChange={this.onChange}
        width={400}
        height={400}
      >

        <LocationPin
          lat={this.state.yourHereCoords.lat}
          lng={this.state.yourHereCoords.lng}
        />
      </GoogleMapReact>
    )
  }
}

export default GoogleReactMap
