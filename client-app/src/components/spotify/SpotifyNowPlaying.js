import React, {Component} from 'react';
import scrobblerConfig from '../../../config/spotify-scrobbler';
import RecentTrack from './SpotifyRecentTrack';

export default class SpotifyNowPlaying extends Component {
  constructor(props){
    super(props);
    this.state = {
      trackNowPlaying: {
        url: null,
        name: null,
        artist: {'#text': null},
        album: {'#text': null},
        image: [
          {'#text' : null},
          {'#text' : null},
          {'#text' : null},
          {'#text' : null}
        ]
      }
    }
  }
  loadRecentTracks(){
    let uri = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${scrobblerConfig.SCROBBLER_API_REGISTERED_USER}&api_key=${scrobblerConfig.SCROBBLER_API_KEY}&limit=1&format=json`;
    let recentTrackComponents;

    $.getJSON(uri, function(data) {
      console.log(data);
      this.setState({trackNowPlaying: data.recenttracks.track[0]});
    }.bind(this));
  }
  componentDidMount(){
    this.loadRecentTracks();
    // setInterval(this.loadRecentTracks.bind(this), 2000);
  }
  render() {
    return (
      <div>
        <RecentTrack {...this.state.trackNowPlaying} />
      </div>
    );
  }
}



