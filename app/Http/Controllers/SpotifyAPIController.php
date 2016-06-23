<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\SpotifyAccount;
use Auth;
use App\User;
use GuzzleHttp\Client;

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

        $code = $request->input('code');
        
        // Make Request for tokens
        // 
        $guzzleClient = new Client([
            // Base URI is used with relative requests
            'base_uri' => 'https://accounts.spotify.com',
            // You can set any number of default request options.
            'timeout'  => 2.0,
        ]);

        $body = [
            "grant_type" => 'authorization_code',
            "redirect_uri" => env('SPOTIFY_AUTH_REDIRECT_URL'),
            "client_id" => env('SPOTIFY_CLIENT_ID'),
            "client_secret" => env('SPOTIFY_CLIENT_SECRET'),
            "code" => $code
        ];

        $guzzleResponse = $guzzleClient->request('POST', '/api/token', ['form_params' => $body]);

        dd($guzzleResponse);
        // Check if the User already has a SpotifyAccount associated with them
        //
        if(count($currentUser->spotify_account)){
            // Update the related SpotifyAccount Entry
            //
            $currentUser->spotify_account->update(['access_token' => $token]);
        } else {
            // Create a new SpotifyAccount and associate it with the User
            // 
            $spotifyAccount = new SpotifyAccount(['access_token' => $token, 'user_id' => $currentUser->id]);
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
}
