import React, {Component} from 'react';
import scrobblerConfig from '../../../config/spotify-scrobbler';
import {connect} from 'react-redux';
import * as actions from '../../actions/index';

export default class SpotifyPlaylistSelector extends Component {

  constructor(props){
    super(props);
    this.state = {
      playlists: []
    };
  }
  loadPlaylists(){
    let uri = `https://api.spotify.com/v1/users/${scrobblerConfig.SPOTIFY_USER_ID}/playlists?format=json`;
    let recentTrackComponents;

    $.getJSON(uri, function(data) {
      console.log('Getting Playlists');
      console.log(data);
      // this.setState({currentTracks: data.recenttracks.track});
    }.bind(this));
  }
  componentWillMount(){
    this.loadPlaylists();
    this.props.spotifyPlayistInfo();
  }
  render() {
    let playlistOptions = this.state.playlists.map((playlist, i) => {
      console.log(playlist);
      return (
        <option></option>
      );
    });

    return (
      <select>
        {playlistOptions}
      </select>
    );
  }
}

function mapStateToProps(state) {
  return {
    playlist: state.spotify.playlist
  }
}

export default connect(mapStateToProps, actions)(SpotifyPlaylistSelector);