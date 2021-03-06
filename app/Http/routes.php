<?php

use Illuminate\Http\Request;
use App\User;
use Tymon\JWTAuth\Facades\JWTAuth;

/*
|--------------------------------------------------------------------------
| Application Routes |--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.  | It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::auth();

Route::get('/', function (){
  return view('react');
});

Route::get('/spotify', function (){
  return view('react');
});

Route::get('/spotify/redirect-url', 'SpotifyAPIController@store');
Route::get('/spotify/access-token', 'SpotifyAPIController@getAcessToken');
Route::get('/spotify/user/playlists', 'SpotifyAPIController@getUserPlaylists');

Route::group(['prefix' => 'api','cors'],function () {
  Route::post("login","AuthenticateController@authenticate");
  Route::post('/register','AuthenticateController@register');
});

Route::group(['prefix' => 'api','jwt.auth','cors'],function () {
  Route::resource('posts','PostController');
  Route::get('userinfo', function () {
    return JWTAuth::parseToken()->authenticate();
  });
});
