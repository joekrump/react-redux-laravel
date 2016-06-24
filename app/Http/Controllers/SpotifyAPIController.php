<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\SpotifyAccount;
use Auth;
use App\User;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

class SpotifyAPIController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Check if the user is logged in
        // 
        if(!Auth::check()){
            return response()->json(['error' => 'Sorry, you must be logged in to do this'], 401);
        } else {
            $currentUser = $request->user();
        }

        // Get an associative array containing the token data
        // 
        $auth_tokens = SpotifyAPIController::getNewSpotifyTokens([
            'code' => ($request->input('code')),
            'redirect_uri' => env('SPOTIFY_AUTH_REDIRECT_URL'),
            'grant_type'=> 'authorization_code'
        ]);
        
        // Check if the User already has a SpotifyAccount associated with them
        //
        if(count($currentUser->spotify_account)){
            // Update the related SpotifyAccount Entry
            //
            $currentUser->spotify_account->update($auth_tokens);
        } else {
            // Create a new SpotifyAccount and associate it with the User
            //
            $auth_tokens['user_id'] = $currentUser->id;

            $spotifyAccount = new SpotifyAccount($auth_tokens);
            $spotifyAccount->save();
        }

        return redirect('/spotify');
        // return response()->json(['access_token' => $token, 'message' => 'Saved token'], 200);
    }

    public function show($id)
    {

    }

    /**
     * Retreive the Spotify access token
     *
     * @param  int  $userId
     * @return \Illuminate\Http\Response
     */
    public function getAcessToken(Request $request)
    {
        if(!Auth::check()){
            return response()->json(['error' => 'Sorry, you are not permitted to do this'], 403);
        }

        try {
            $user = $request->user();
        } catch (Exception $e){
            return response()->json(['error' => $e], 500);
        }
        
        return response()->json(['access_token' => $user->spotify_account->access_token], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    public function getUserPlaylists(Request $request){
        if(!Auth::check()){
            return response()->json(['error' => 'Sorry, you are not permitted to do this'], 403);
        }

        try {
            $user = $request->user();
        } catch (Exception $e){
            return response()->json(['error' => $e], 500);
        }

        // If the logged in user already has attached to a spotiy account then this will be set
        if(count($user->spotify_account)){
            // Make a request to get an authorization token using the refresh token for the user.
            // 
            $auth_tokens = SpotifyAPIController::getNewSpotifyTokens([
                'grant_type' => 'refresh_token',
                'refresh_token' => ($user->spotify_account->refresh_token)
            ]);

            // Update the access_token for the user
            //
            $user->spotify_account->update($auth_tokens);
            
            // Prepare the request paramets
            //
            $request_params = [
                'headers' => ['Authorization' => "Bearer {$auth_tokens['access_token']}"],
                'auth' => null
            ];

            // Get Spotify UserId
            $spotify_user = SpotifyAPIController::getSpotifyInfo(
                'https://api.spotify.com/v1/',
                'me',
                $request_params
            );

            // Get playlists the Spotify User's id
            //
            $playlists = SpotifyAPIController::getSpotifyInfo(
                'https://api.spotify.com/v1/', 
                "users/{$spotify_user['id']}/playlists", 
                $request_params
            );

            $playlistOptions = [];

            foreach($playlists['items'] as $item) {
                $playlistOptions[] = [
                    'name' => $item['name'],
                    'uri' => $item['uri']
                ];
            }
            return response()->json(['playlist_options' => $playlistOptions]);
             
        } else {
            // Otherwise return a url to have the user be redirected to in order to authenticate
            // 
            $authentication_url = "https://accounts.spotify.com/authorize/?client_id={env('SPOTIFY_CLIENT_ID')}&response_type=code&redirect_uri={env('SPOTIFY_AUTH_REDIRECT_URL')}";
            return response()->json(['url' => $authentication_url], 200);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // CHECK IF THE USER IS LOGGED IN
        echo('USER IS AUTHENTICATED?????');
        dd(Auth::check());

        dd($request->user());

        $post = SpotifyAccount::find($id);
        echo('Updating');
        // $post->update([

        // ]);
        return response()->json("UPDATED",200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    /**
     * [getNewSpotifyTokens description]
     * @param  string $code             Authorization code used for getting intial token
     * @param  string $grant_type       'refresh_token' or 'authorization_code'
     * @param  Array $additional_params additional parameters to send in the body.
     * @return Array                    An array containing OAuth tokens for Spotify
     */
    private static function getNewSpotifyTokens($additional_params = []){

        $code_assoc = [];

        // Create Guzzle Client to create request with
        // 
        $guzzleClient = new Client([
            // Base URI is used with relative requests
            'base_uri' => 'https://accounts.spotify.com',
            'timeout'  => 2.0
        ]);

        // Set required fields
        $default_params = [
            "grant_type" => 'authorization_code',
            "client_id" => env('SPOTIFY_CLIENT_ID'),
            "client_secret" => env('SPOTIFY_CLIENT_SECRET'),
        ];

        $params = array_merge($default_params, $additional_params);

        $guzzleResponse = $guzzleClient->request('POST', '/api/token', ['form_params' => $params]);
        $responseBody = $guzzleResponse->getBody();

        // Get an associative array containing the token data
        $tokenData = json_decode($responseBody->getContents(), true);

        return $tokenData;
    }

    /**
     * Make an HTTP request to Spotify's API using Guzzle
     * 
     * @param  string $base_url     The root uri that the request is being made for ex. 'https://api.spotify.com/v1/users'
     * @param  string $path         Additional path piece ex. '/dfjasdklsdja/playlists'
     * @param  array  $params       Parameters to send in the request
     * @param  string $method       HTTP method 'GET', 'PUT', 'POST', etc
     * @return Array                An associative array containing the response data
     */
    private static function getSpotifyInfo($base_url, $path, $params=[], $method='GET'){
        $guzzleClient = new Client([
            'base_uri' => $base_url,
            'timeout'  => 5.0
        ]);

        
        $full_params = array_merge([], $params);
        try {
            $guzzleResponse = $guzzleClient->request($method, $path, $full_params);
        } catch (RequestException $e){
            error_log($e);
        }

        $responseBody = $guzzleResponse->getBody();

        $parsedResponse = json_decode($responseBody->getContents(), true);

        return $parsedResponse;
    }
}
