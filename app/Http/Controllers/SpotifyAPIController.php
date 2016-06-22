<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\SpotifyAccount;
use Auth;

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
        // CHECK IF THE USER IS LOGGED IN
        echo('USER IS AUTHENTICATED?????');
        dd(Auth::check());

        dd($request->user());

        echo('Saving');
        dd($request);
        // $post = SpotifyAccount::create([

        // ]);   
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
