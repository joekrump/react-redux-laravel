import React, {Component} from 'react';
import scrobblerConfig from '../../../config/spotify-scrobbler';
import {connect} from 'react-redux';
import * as actions from '../../actions/index';
import axios from 'axios';

export default class SpotifyPlaylistSelector extends Component {
  loadUser(accessToken){
    let userURI = "https://api.spotify.com/v1/me";

    axios.get(userURI,
    {
      headers:{Authorization:`Bearer ${accessToken}`}
    }).then(response => {
      console.log(response);
    });
  }
  loadPlaylists(accessToken, userId){
    let playlistURI = `https://api.spotify.com/v1/me/${userId}/playlists?format=json`;
    let recentTrackComponents;

    axios.get(playlistURI,
    {
      headers:{Authorization:`Bearer ${accessToken}`}
    }).then((response) => {
      console.log(response);
    });

    // $.getJSON(uri, function(data) {
    //   console.log('Getting Playlists');
    //   console.log(data);
    //   // this.setState({currentTracks: data.recenttracks.track});
    // }.bind(this));
  }
  componentDidMount(){
    console.log(this.props.accessToken)
    if(this.props.accessToken !== undefined && !this.props.accessToken.loading){
      this.loadUser(this.props.accessToken.token);
    }
  }
  componentWillUpdate(nextProps){
    if(nextProps.accessToken !== undefined && !nextProps.accessToken.loading){
      console.log(nextProps.accessToken);
      this.loadUser(nextProps.accessToken.token);
    }
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