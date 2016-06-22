import { combineReducers } from 'redux';
import {reducer as form} from 'redux-form';
import authReducer from './auth_reducer';
import postReducer from './post_reducer';
import spotifyReducer from './spotify_reducer';

const rootReducer = combineReducers({
   form,
   auth: authReducer,
   posts: postReducer,
   spotify: spotifyReducer
});
export default rootReducer;
