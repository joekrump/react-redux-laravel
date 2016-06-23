import React, {Component} from 'react';
import scrobblerConfig from '../../../config/spotify-scrobbler';
import * as actions from '../../actions/index';
import {updateSpotifyPlaylist} from  '../../actions/index';
import {connect} from 'react-redux';

export default class SpotifyPlaylistSelector extends Component {
  constructor(props){
    super(props)
    this.state = {
      playlistOptions: []
    }
  }
  changeVisiblePlaylist(event){
    // Do something here to change the playlist that is showing
    let playlistURI = event.target.value;
    // Dispatch action to be handled by the spotify_reducer
    this.props.updateSpotifyPlaylist(playlistURI);
  }
  loadPlaylists(){
    let playlistsURI = '/spotify/user/playlists';

    $.getJSON(playlistsURI, function(data) {
      this.setState({playlistOptions: data.playlist_options});
    }.bind(this));
  }
  componentDidMount(){
    this.loadPlaylists();
  }
  render() {

    if(this.state.playlistOptions.length > 1){
      let playlistElements = this.state.playlistOptions.map((playlist, i) => {
        return (
          <option value={playlist.uri} key={i}>{playlist.name}</option>
        );
      });
      return (
        <select onChange={this.changeVisiblePlaylist.bind(this)}>
          {playlistElements}
        </select>
      );
    } else if(this.state.playlistOptions.length == 1) {
      return (<div>{this.state.playListOptions[0].name}</div>)
    } else {
      return (<div></div>);
    }
  }
}

function mapStateToProps(state) {
  return {
    playlist: state.spotify.playlist
  }
}

export default connect(mapStateToProps, {updateSpotifyPlaylist})(SpotifyPlaylistSelector);