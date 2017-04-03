import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import AppRouter from './app-router/app-router.jsx';

//log in page
function NotLoggedIn(props) {
  return (
         <div id="log-in-pond">
			<div>
				<img alt="" src={'images/logo.png'} />
			</div>
			<form id="form" name="form" action="#" method="post">
				<div id="block">
					<label id="user" htmlFor="name">u</label>
					<input type="text" name="name" id="name" placeholder="Username" required/>
					<label id="pass" htmlFor="password">p</label>
					<input type="password" name="password" id="password" placeholder="Password" required />
					<input type="submit" id="submit" name="submit" value="a"/>
				</div>
				<div id="option">
					<p>What's Tweeting?</p>
				</div>
			</form>
		</div>
      );
}

function LoggedIn(props) {
	return (
		<div id="logged-in-pond">
			<div id="menu">
				<div>
					<img alt="" src={'images/logo.png'} />
				</div>

				<ul className="parent-menu">
					<li> <a href="#">Word Clouds</a>
						<ul>
							<li><a href="#" id="WordcloudsSearch">Search</a></li>
							<li><a href="#" id="WordcloudsGenerate">Generate</a></li>
						</ul>
					</li>
					<li> <a href="#">About</a></li>
					<li> <a href="#">My Profile</a>
						<ul>
							<li><a href="#" id="UpdateProfile">Update Profile</a></li>
							<li><a href="#" id="WordcloudsProfile">View Saved</a></li>
						</ul>
					</li>
					<li> <a href="#">Help</a></li>
					<li> <a href="#">Log Out</a></li>
				</ul>
			</div>

			<div id="container">
				Lorem ipsum dolor sit amet, eu aliquip consequat usu. Qui vitae eligendi molestiae an, eu duo unum eloquentiam. Nec et elit epicuri. Amet soluta ullamcorper mei no, nullam consetetur dissentiet ei vim. Quas sensibus id mei, ius te nulla platonem voluptatum.

				<p>Amet fabellas assentior te usu. Sed eu iusto posidonium, cu vel deseruisse delicatissimi. Cum assum nullam legendos ad. Eos sale movet exerci ut. Latine appareat vituperata in qui.</p>

				<p>Dicta nihil necessitatibus pro ex, no nisl malorum ius. Duo quaestio hendrerit at. Vix vidit veniam argumentum et, erant noster an vel, ne soleat populo nam. At pro sale quodsi eleifend, te mei probo justo. Te debet nominavi scaevola sit, iriure erroribus id his, est ad case dicunt luptatum.</p>

				<p>Sit labitur propriae intellegat ea. Vel nobis maiorum persecuti id. Ad eam minim laudem. Ea repudiare argumentum qui.</p>

				<p>Eam labore facilisi id, te albucius consequat his. Nam cetero nusquam at. Id deleniti voluptatum delicatissimi duo, qui ad eros alienum. Illud atomorum instructior te vim, erat erant tincidunt qui te. Mel ut essent sadipscing. Volutpat dignissim argumentum in pro, sed no recteque adolescens, id vis quaeque tacimates. Dicunt electram vulputate id has, eum et zril quidam labitur.</p>
			</div>

		</div>
	);
}

function Welcome(props) {
	const isLoggedIn = props.isLoggedIn;

	if (isLoggedIn) {
		return <LoggedIn />;
	}

	return <NotLoggedIn />;
}

ReactDOM.render(
	//Current needs to be isLoggedIn={true} to see logged-in page
	<AppRouter />,
	document.getElementById('root')
);
