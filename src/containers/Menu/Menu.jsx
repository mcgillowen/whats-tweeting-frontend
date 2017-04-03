import React, {Component} from 'react';
import './Menu.css';

export default class Menu extends Component {

  render() {
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
          {this.props.children}
        </div>
      </div>
    );
  }
}
