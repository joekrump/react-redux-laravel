import {
  SPOTIFY_PLAYLIST_INFO,
  UPDATE_SPOTIFY_PLAYLIST,
  SPOTIFY_ACCESS_TOKEN,
  SPOTIFY_ACCESS_TOKEN_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  playlist: {
    uri: 'spotify:user:22iimjzhxqlrha4hzw3pkgtwy:playlist:02mOgs4keylxniBJditSd4',
    error: null,
    loading: false,
    accessToken: null
  }
};

export default function (state = INITIAL_STATE, action){
  switch (action.type) {
    case UPDATE_SPOTIFY_PLAYLIST:
      return { 
        ...state, 
        playlist: {
          uri: action.payload,
          error: null
        }
      };     
    case SPOTIFY_ACCESS_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        accessToken: {
          loading: false,
          token: action.payload.data.access_token
        }
      };
    case SPOTIFY_ACCESS_TOKEN:
      return {
        ...state,
        loading: false,
        accessToken: {
          loading: true,
          token: null
        }
      }
    case SPOTIFY_PLAYLIST_INFO:
      return state;
    default:
      return state;
  }
}
