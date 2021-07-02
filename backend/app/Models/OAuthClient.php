<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $secret
 */
class OAuthClient extends Model
{
    protected $table = 'oauth_clients';

    protected $fillable = [
        'id',
        'secret'
    ];

    public static function getAuthClient(): self
    {
        if (!$client = self::where('id', env('APP_OAUTH_CLIENT_ID'))->first()) {
            throw new \DomainException('This client has not found');
        }

        return $client;
    }
}
