import {
  UPDATE_SPOTIFY_PLAYLIST,
  UPDATE_SPOTIFY_PLAYLIST_SUCCESS,
  SPOITFY_PLAYLIST_INFO
} from '../actions/types';

const INITIAL_STATE = {
    postsList:{
      playlistId:null,
      error:null,
      loading:false
    },
    newPost:{
      post:null,
      error:null,
      loading:false
    },
    deletedPost:{
      post:null,
      error:null,
      loading:false
    },
    editPost:{
      post:null,
      error:null,
      loading:false
    },
    activePost:{
      post:null,
      error:null,
      loading:false
    },
    updatePost:{
      post:null,
      error:null,
      loading:false
    }
};

export default function (state = INITIAL_STATE,action){
    switch (action.type) {
      case UPDATE_SPOTIFY_PLAYLIST:
        return { 
          ...state, 
          postsList: {
            posts:[],
            error:null,
            loading:true
          }
        };     
      case UPDATE_SPOTIFY_PLAYLIST_SUCCESS:
        return { ...state, postsList:{posts:action.payload.data,error:null,loading:false}};
      case SPOITFY_PLAYLIST_INFO:
        return {...state,activePost:{post:null,error:null,loading:true}};    
      default:
        return state;
    }
}
