import React, {Component} from 'react';
import scrobblerConfig from '../../../config/spotify-scrobbler';

export default class SpotifyRecentTracks extends Component {
  constructor(props){
    super(props)

    this.state = {
      artistVal: null,
      trackVal: null
    }
  }
  componentWillMount(){
    let uri = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${scrobblerConfig.SCROBBLER_API_REGISTERED_USER}&api_key=${scrobblerConfig.SCROBBLER_API_KEY}&format=json`;
    $.getJSON(uri, function(data) {

      let artistVal = data.recenttracks.track[0].artist["#text"]
      let trackVal = data.recenttracks.track[0].name;
      this.setState({
        artistVal,
        trackVal
      })
    }.bind(this));
  }
  render() {
    return (
      <div>
        <ul>
          <li>{this.state.artistVal}</li>
          <li>{this.state.trackVal}</li>
        </ul>
      </div>
    );
  }
}

