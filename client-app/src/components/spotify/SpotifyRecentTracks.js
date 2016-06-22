import React, {Component} from 'react';
import scrobblerConfig from '../../../config/spotify-scrobbler';
import RecentTrack from './RecentTrack';

export default class SpotifyRecentTracks extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentTracks: []
    }
  }
  componentWillMount(){
    let uri = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${scrobblerConfig.SCROBBLER_API_REGISTERED_USER}&api_key=${scrobblerConfig.SCROBBLER_API_KEY}&format=json`;
    let recentTrackComponents;

    $.getJSON(uri, function(data) {
      console.log(data.recenttracks.track);
      this.setState({currentTracks: data.recenttracks.track});
    }.bind(this));
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

