import React, {Component} from 'react';
import Search from '../../components/SearchField/SearchField.jsx';
import SearchSlider from '../../components/SearchSlider/SearchSlider.jsx';
import './WordCloudsGenerate.css';

export default class WordCloudsGenerate extends Component {

	render() {
		return (
			<div className='wcGenerate'>
				<div className='wcGenerate-header'>
					<h1>Generate New Word Cloud</h1>
				</div>
				
				<div className='wcGenerate-user'>
					<p>Twitter User</p>
					<Search />
				</div>
				
				<div className='wcGenerate-scope'>
					<p>Time Scope</p>
					<SearchSlider />
				</div>
				
				<button>
					Go
				</button>
			</div>
		);
	};
}
