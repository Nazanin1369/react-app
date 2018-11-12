import React from 'react';
import PropTypes from 'prop-types';

class App extends React.Component {
    constructor() {
      super();
      this.state = {
        txt: 'this is the state text'
      }

      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
      this.setState({txt: event.target.value})
    }

    render() {
        //return React.createElement('h1', null, 'Hello Universe!');
        return (
          <div>
            <h1>{this.state.txt}</h1> 
            <Widget update={this.handleChange} />
          </div>
        )
    }
}

const Widget = (props) => <input type="text" onChange={props.update} />

// App.propTypes = {
//   txt2: PropTypes.string.isRequired,
//   cat: PropTypes.number.isRequired
// }

// App.defaultProps = {
//   txt2: "this is the default txt"
// }

//const App = () => <h1>Hello Universe!</h1>

export default App;