import React, { Component } from 'react';
import SpotifyPlayer from 'react-spotify-player';
import SpotifyUserDetails from './SpotifyUserDetails';

// size may also be a plain string using the presets 'large' or 'compact' 
const size = {
  width: '100%',
  height: 300,
};
const view = 'list'; // or 'coverart' 
const theme = 'black'; // or 'white' 

export default class SpotifyContainer extends Component {
  render() {
    return (
      <div>
        <SpotifyUserDetails userId="22iimjzhxqlrha4hzw3pkgtwy" size="detail" view="detail" />
        <SpotifyPlayer
          uri="spotify:user:22iimjzhxqlrha4hzw3pkgtwy:playlist:0hA7JeMWhiP6sfpzp6RtOF"
          size={size}
          view={view}
          theme={theme} />
      </div>
    )
  }
}