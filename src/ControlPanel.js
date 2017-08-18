import React, { Component } from 'react'

const defaultContainer = ({children}) => <div className="control-panel">{children}</div>

const mapBoxStyles = [
  {name: 'streets', value: 'mapbox://styles/mapbox/streets-v9'},
  {name: 'outdoors', value: 'mapbox://styles/mapbox/outdoors-v9'},
  {name: 'light', value: 'mapbox://styles/mapbox/light-v9'},
  {name: 'dark', value: 'mapbox://styles/mapbox/dark-v9'},
  {name: 'satellite', value: 'mapbox://styles/mapbox/satellite-v9'},
  {name: 'satellite streets', value: 'mapbox://styles/mapbox/satellite-streets-v9'}
]

export default class ControlPanel extends Component {

  constructor(props){
    super(props)
    this.state = {
      mapStyle: mapBoxStyles[0].value
    }
  }

  handleChange = (event) => {
    this.setState({
      mapStyle: event.target.state
    })
    this.props.onStyleChange(event.target.value)
  }
  render () {
    const Container = this.props.containerComponent || defaultContainer

    const styles = mapBoxStyles.map((s, i) => 
      <option key={i} value={s.value}>{s.name}</option>
    )

    return (
      <Container>
        <select value={this.state.mapStyle} onChange={this.handleChange}>
          {styles}
        </select>
      </Container>
    )
  }
}
