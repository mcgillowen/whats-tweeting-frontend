import React, {Component} from 'react';


export default class SearchField extends Component {

  state = {
    value: ''
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  }

  render () {
    return (
      <div className='search-field' style={wrapperStyle}>
        <input
          type="text"
          value={this.state.value}
          placeholder='Search'
          name='search-input'
          onChange={this.handleChange}
          onKeyPress={this.handleKeyEvent}
          autoFocus
        />
      </div>
    );
  }
}
