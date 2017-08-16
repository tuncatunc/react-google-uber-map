import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import locationHistory from './data/transform-location-history.js'

import LocationPin from './LocationPin'

const AnyReactComponent = ({ text }) => <div>{text}</div>

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
    const center =
      nextProps.location.isAvailable
        ? [nextProps.location.latitude, nextProps.location.longitude]
        : [59.938043, 30.337157]

    const yourHereCoords =
      nextProps.location.isAvailable
        ? {lat: nextProps.location.latitude, lng: nextProps.location.longitude}
        : {lat: 0, lng: 0}

    this.setState({center, yourHereCoords})
    console.log(this.state)
  }

  render () {
    return (
      <div className="child">
        <GoogleMapReact
          // apiKey={YOUR_GOOGLE_MAP_API_KEY} // set if you need stats etc ...
          center={this.state.center}
          zoom={this.state.zoom}>
          {/* {
            locationHistory.map(location =>
              <LocationPin
                lat= { location.latitude }
                lng= { location.longitude }
              />
            )
          } */}
          <LocationPin
            lat={this.state.yourHereCoords.lat}
            lng={this.state.yourHereCoords.lng}
          />
        </GoogleMapReact>
      </div>
    )
  }
}

export default GoogleReactMap
