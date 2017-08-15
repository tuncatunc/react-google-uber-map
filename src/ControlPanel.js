import React, {PureComponent} from 'react'

const defaultContainer = ({children}) => <div className="control-panel">{children}</div>

export default class ControlPanel extends PureComponent {
  render () {
    const Container = this.props.containerComponent || defaultContainer

    return (
      <Container>
        <h3>Uber Map Sample</h3>
        <div className="source-link">
          <a href="https://github.com/tuncatunc/react-maps-side-by-side" target="_new">View Code ↗</a>
        </div>
      </Container>
    );
  }
}
