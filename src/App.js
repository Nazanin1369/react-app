import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor() {
      super();
      this.state = {
        txt: 'this is the state text',
        currentEvent: '-----',
        a: '',
        b: '',
        value: 0
      }

      this.handleChange = this.handleChange.bind(this);
      this.update = this.update.bind(this);
      this.updateInput = this.updateInput.bind(this);
      this.updateComponent = this.updateComponent.bind(this);
    }

    handleChange(event) {
      this.setState({txt: event.target.value})
    }

    update(event) {
      this.setState({currentEvent: event.type});
    }

    updateInput(event) {
      this.setState({
        //a: ReactDOM.findDOMNode(this.a).value,
        a: this.a.refs.input.value,
        b: this.refs.b.value,
      })
    }

    updateComponent() {
      this.setState({value: this.state.value + 1});
    }

    componentWillMount() {
      // No access to DOM represntations since it has not been placed into the DOM
      // Aceess to state and props
      console.log('Component will mount.');
      this.setState({value: 10});
    }

    componentDidMount() {
      console.log('Component did mount.');
      // Access to component in the DOM
      console.log(ReactDOM.findDOMNode(this));
      this.inc = setInterval(this.updateComponent, 500);
    }

    componentWillUnmount() {
      console.log('Component will unmount.');
      clearInterval(this.inc);
    }

    componentWillUpdate() {
      console.log('Component will update.');
    }

    render() {
        //return React.createElement('h1', null, 'Hello Universe!');
        console.log('Component rendered');

        return (
          <div>
            <h1>{this.state.txt}</h1> 
            <Widget update={this.handleChange} />
            <Button>React <Heart /></Button>
            <Title title="LongText" />
            <textarea 
              cols="30" 
              rows="10" 
              onKeyPress={this.update}
              onCopy={this.update}
              onPaste={this.update}
              onCut={this.update} 
              onFocus={this.update}
              onBlur={this.update}
              onDoubleClick={this.update}
              onTouchStart={this.update} />
            <h1>{this.state.currentEvent}</h1>

            <Input 
              ref={ component => this.a = component } 
              updateInput={this.updateInput} />
            <p>{this.state.a}</p>

            <input 
              ref="b" 
              onChange={this.updateInput} />
            <p>{this.state.b}</p>

            <button onClick={this.updateComponent}>{this.state.value}</button>
          </div>
        )
    }
}

class Heart extends React.Component {
  render() {
    return <span>&hearts;</span>
  }
}

class Input extends React.Component {
  render() {
    return  <input type="text" ref="input" onChange={this.props.updateInput} />
  }
}

class Wrapper extends React.Component {
  mount() {
    ReactDOM.render(<App />, document.getElementById('a'));
  }

  unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById('a'));
  }

  render() {
    return (
      <div>
        <button onClick={this.mount.bind(this)}>Mount</button>
        <button onClick={this.unmount.bind(this)}>UnMount</button>
        <div id="a"></div>
      </div>
    );
  }
}

const Widget = (props) => <input type="text" onChange={props.update} />
const Button = (props) => <button>{props.children}</button> 
const Title = (props) => <h1>Title: {props.title}</h1> 

Title.propTypes = {
  // title: PropTypes.string.isRequired
  title(props, propName, component) {
    if(!(propName in props)) {
      return new Error(`Missing ${propName}`)
    }

    if(props[propName].length < 6) {
      return new Error(`${propName} was too short!`)
    }
  }
}
// App.propTypes = {
//   txt2: PropTypes.string.isRequired,
//   cat: PropTypes.number.isRequired
// }

// App.defaultProps = {
//   txt2: "this is the default txt"
// }

//const App = () => <h1>Hello Universe!</h1>

export default Wrapper;