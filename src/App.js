import React, { Component } from 'react'
import Maps from './Maps'
import LocationInput from './LocationInput'
import './App.css'

export default class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      location: {}
    }
  }
  onLocationChange = (location) => {
    this.setState({location})
  }

  render () {
    return (
      <div>
        <LocationInput onLocationChange={this.onLocationChange}/>
        <Maps selectedLocation={this.state.location}/>
      </div>
    )
  }
}
