import React, { Component } from 'react';
import SpotifyPlayer from 'react-spotify-player';
import SpotifyUserDetails from './SpotifyUserDetails';
import SpotifyRecentTracks from './SpotifyRecentTracks';
import SpotifyNowPlaying from './SpotifyNowPlaying';
import scrobblerConfig from '../../../config/spotify-scrobbler';

// size may also be a plain string using the presets 'large' or 'compact' 
const size = {
  width: '100%',
  height: 300,
};
const view = 'list'; // or 'coverart' 
const theme = 'black'; // or 'white' 

export default class SpotifyContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlaylist: {
        id: '0hA7JeMWhiP6sfpzp6RtOF'
      }
    }
  }
  render() {
    return (
      <div>
        <SpotifyUserDetails userId={scrobblerConfig.SPOTIFY_USER_ID} size="detail" view="detail" />
        <SpotifyPlayer
          uri={`spotify:user:${scrobblerConfig.SPOTIFY_USER_ID}:playlist:${this.state.currentPlaylist.id}`}
          size={size}
          view={view}
          theme={theme} />
          <SpotifyNowPlaying />
          <SpotifyRecentTracks />
      </div>
    )
  }
}