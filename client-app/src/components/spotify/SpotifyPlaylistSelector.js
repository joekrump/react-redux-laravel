import React, {Component} from 'react';
import scrobblerConfig from '../../../config/spotify-scrobbler';
import {connect} from 'react-redux';
import * as actions from '../../actions/index';
import axios from 'axios';

export default class SpotifyPlaylistSelector extends Component {

  loadPlaylists(){
    let playlistsURI = '/spotify/user/playlists';

    $.getJSON(playlistsURI, function(data) {
      console.log(data);
      this.setState({playlistOptions: data.playlist_options});
    }.bind(this));

    // $.getJSON(uri, function(data) {
    //   console.log('Getting Playlists');
    //   console.log(data);
    //   // this.setState({currentTracks: data.recenttracks.track});
    // }.bind(this));
  }
  componentDidMount(){
    this.loadPlaylists();
  }
  render() {

    console.log('props');
    console.log(this.state);
    console.log('end props');

    let playlistOptions = null;

    if(this.props.playlists){
      playListOptions = this.props.playlists.map((playlist, i) => {
        console.log(playlist);
        return (
          <option></option>
        );
      });
    }
    

    return (
      <select>
        {playlistOptions}
      </select>
    );
  }
}