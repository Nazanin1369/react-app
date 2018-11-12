import React from 'react';
import PropTypes from 'prop-types';

class App extends React.Component {
    constructor() {
      super();
      this.state = {
        txt: 'this is the state text'
      }
    }

    update(e) {
      this.setState({txt: e.target.value})
    }

    render() {
        //return React.createElement('h1', null, 'Hello Universe!');
        let txt2 = this.props.txt2;
        return (
          <div>
            <input type="text"
            onChange={this.update.bind(this)} />
            <h1>{this.state.txt}</h1> 
            <b>:) Wink </b> <label>{txt2}</label>
          </div>
        )
    }
}

App.propTypes = {
  txt2: PropTypes.string.isRequired,
  cat: PropTypes.number.isRequired
}

App.defaultProps = {
  txt2: "this is the default txt"
}

//const App = () => <h1>Hello Universe!</h1>

export default App;