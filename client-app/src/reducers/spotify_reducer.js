import {
  SPOTIFY_PLAYLIST_INFO,
  UPDATE_SPOTIFY_PLAYLIST,
  UPDATE_SPOTIFY_PLAYLIST_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    getPlaylist:{
      playlistId: '0hA7JeMWhiP6sfpzp6RtOF',
      error: null,
      loading: false
    },
    updatePlaylist:{
      playlistId: null,
      error: null,
      loading: false
    }
};

export default function (state = INITIAL_STATE, action){
    switch (action.type) {
      case UPDATE_SPOTIFY_PLAYLIST:
        return { 
          ...state, 
          updatePlaylist: {
            playlistId: action.payload.data,
            error: null,
            loading: true
          }
        };     
      case UPDATE_SPOTIFY_PLAYLIST_SUCCESS:
        return { 
          ...state, 
          getPlaylist: {
            playlistId: action.payload.data,
            error: null,
            loading: false
          }
        };
      case SPOTIFY_PLAYLIST_INFO:
        console.log('Getting Playlist Info');
        console.log(action);
        return {
          ...state,
          getPlaylist: {
            playlistId: action.payload.data,
            error: null,
            loading: true
          }
        };    
      default:
        return state;
    }
}
