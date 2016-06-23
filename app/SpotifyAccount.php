<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SpotifyAccount extends Model
{
    protected $table = "spotify_accounts";

    protected  $fillable = [
      'id',
      'user_id',
      'access_token',
      'token_type' ,
      'expires_in',
      'refresh_token'
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
