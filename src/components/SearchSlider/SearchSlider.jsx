import React, {Component} from 'react';

export default class SearchSlider extends Component {

  state = {
    value: 200
  }

  handleChange = (e) => {
    this.setState({value: e.target.value});
    console.log(e.target.value);
  }

  render() {
    return (
      <div className='search-slider'>
        <input
          type='range'
          name='slider'
          value={this.state.value}
          min='200'
          step='200'
          max='3200'
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
