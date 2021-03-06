import React, { Component } from 'react';
import SpotifyPlayer from 'react-spotify-player';
import SpotifyUserDetails from './SpotifyUserDetails';
import SpotifyRecentTracks from './SpotifyRecentTracks';
import SpotifyNowPlaying from './SpotifyNowPlaying';
import SpotifyPlaylistSelector from './SpotifyPlaylistSelector';
import scrobblerConfig from '../../../config/spotify-scrobbler';
import {connect} from 'react-redux';
import * as actions from '../../actions/index';

// size may also be a plain string using the presets 'large' or 'compact' 
const size = {
  width: '100%',
  height: 300,
};
const view = 'list'; // or 'coverart' 
const theme = 'black'; // or 'white' 

export default class SpotifyContainer extends Component {
  componentWillMount() {
    this.props.spotifyPlayistInfo();
    this.props.getSpotifyToken();
  }

  render() {
    return (
      <div>
        <a className="btn btn-primary" href={`https://accounts.spotify.com/authorize/?client_id=${scrobblerConfig.SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${scrobblerConfig.SPOTIFY_AUTH_REDIRECT_URL}`}>
          AUTHORIZE SPOTIFY
        </a>
        <SpotifyUserDetails size="detail" view="detail" />
        <SpotifyPlaylistSelector accessToken={this.props.accessToken} />
        <SpotifyPlayer
          uri={this.props.playlist.uri}
          size={size}
          view={view}
          theme={theme} />
          <SpotifyNowPlaying />
          <SpotifyRecentTracks />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    playlist: state.spotify.playlist,
    authorized: state.auth.authorized,
    userinfo: state.auth.userinfo,
    accessToken: state.spotify.accessToken,
  }
}

export default connect(mapStateToProps, actions)(SpotifyContainer);