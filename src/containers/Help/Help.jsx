import React, {Component} from 'react';

export default class Help extends Component {
	render() {
		return (
			<div>
				<h1>Help with Using "What's Tweeting"</h1>
				<h2>Word Clouds</h2>
				<h3>Search</h3>
				To search the archives for an existing Word Cloud,
				<ol>
					<li>
						In the menu, select <strong>Search</strong> from the sub-menu under <strong>Word Clouds</strong>.
					</li>
					<li>
						In the field <strong>Twitter User</strong>, type in the Twitter account that you wish to search for existing Word Clouds. <em><font color="#ff0000">Please be aware that this is case sensitive.</font></em>
					</li>
					<li>
						Select <strong>Go</strong> to generate your new Word Cloud.
					</li>
				</ol>
				<p>From here, you can <strong>Like</strong> Word Clouds, and discuss any existing Word Cloud.</p>
				<p><em>Please see the image below for a graphical representation.</em></p>
				<p><center><img alt="" src={'images/search-word-cloud.png'} /></center></p>
				
				<h3>Generate</h3>
				To generate a new Word Cloud:
				<ol>
					<li>
						In the menu, select <strong>Generate</strong> from the sub-menu under <strong>Word Clouds</strong>.
					</li>
					<li>
						In the field <strong>Twitter User</strong>, type in the Twitter account that you wish to generate a Word Cloud from. <em><font color="#ff0000">Please be aware that this is case sensitive.</font></em>
					</li>
					<li>
						Using the <strong>Time Scope</strong> scale, slide the selector over to the number of Tweets you wish to generate a Word Cloud from.
					</li>
					<li>
						Select <strong>Go</strong> to generate your new Word Cloud.
					</li>
				</ol>
				<p><em>Please see the image below for a graphical representation.</em></p>
				<p><center><img alt="" src={'images/generate-word-cloud.png'} /></center></p>
				
				<h2>My Profile</h2>
				<h3>View Saved</h3>
				To view the Word Clouds saved to your profile, in the menu simply click on <strong>View Saved</strong> from the sub-menu under <strong>My Profile</strong>
				<p></p>
			</div>
		);
	};
}