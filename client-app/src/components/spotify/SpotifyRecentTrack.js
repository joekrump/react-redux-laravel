import React, {Component} from 'react';
import scrobblerConfig from '../../../config/spotify-scrobbler';

const defaultImageURL = 'http://dummyimage.com/100';

export default class SpotifyRecentTracks extends Component {

  getTrackImage() {
    return this.props.image && this.props.image[2]['#text'] ? this.props.image[2]['#text'] : defaultImageURL;
  }
  render() {
    let activeStyling = this.props['@attr'] === undefined ? {} : {border:"4px solid #0E9"};

    return (
      <div className="recent-track" style={{...activeStyling, display:'block', marginBottom:'5px'}}>
        <div style={{display:"inline-block"}}>
          <img src={this.getTrackImage()} alt="album cover" style={{width:'100px'}}/>
          <a href={this.props.url} target="_blank" style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', width: '200px', display:"inline-block"}}>{this.props.name}</a>
        </div>
        <div style={{display:"inline-block"}}>
          <ul>
            <li>
              <span>Artist: </span>
              <span>{this.props.artist['#text']}</span>
            </li>
            <li>
              <span>Album: </span>
              <span>{this.props.album['#text']}</span>
            </li>
          </ul>
        </div>
      </div>
    );    
  }
}