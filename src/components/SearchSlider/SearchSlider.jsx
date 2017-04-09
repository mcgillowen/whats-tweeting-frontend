import React, {Component} from 'react';
import Slider from 'rc-slider';
import './SearchSlider.css';

require('rc-slider/assets/index.css');

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Slider2 = createSliderWithTooltip(Slider);

const wrapperStyle = {width: 400, margin: 20};

export default class SearchSlider extends Component {
  render() {
	  return(
			<div style={wrapperStyle}>
				<Slider2 
					dots 
					step={200} 
					defaultValue={400} 
					max={3200} 
				/>
			</div>
		);
	}
}