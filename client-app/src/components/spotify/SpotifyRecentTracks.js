import React, {Component} from 'react';
import scrobblerConfig from '../../../config/spotify-scrobbler';
import RecentTrack from './SpotifyRecentTrack';

export default class SpotifyRecentTracks extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentTracks: []
    }
  }
  loadRecentTracks(){
    let uri = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${scrobblerConfig.SCROBBLER_API_REGISTERED_USER}&api_key=${scrobblerConfig.SCROBBLER_API_KEY}&limit=5&format=json`;
    let recentTrackComponents;

    $.getJSON(uri, function(data) {
      data.recenttracks.track.shift(); // remove first element
      this.setState({currentTracks: data.recenttracks.track});
    }.bind(this));
  }
  componentDidMount(){
    this.loadRecentTracks();
    setInterval(this.loadRecentTracks.bind(this), 30000);
  }
  render() {
    let recentTrackComponents = this.state.currentTracks.map((track, i) => {
      return(<RecentTrack {...track} key={i} />);
    });

    return (
      <div>
        {recentTrackComponents}
      </div>
    );
  }
}

