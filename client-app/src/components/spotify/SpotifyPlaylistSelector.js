import React, {Component} from 'react';
import scrobblerConfig from '../../../config/spotify-scrobbler';

export default class SpotifyPlaylistSelector extends Component {

  render() {
    let playlistOptions = this.state.playlistOption.map((playlist, i) => {
      console.log(playlist);
      return (
        <option></option>
      );
    }

    return (
      <select>

      </select>);
  }
}