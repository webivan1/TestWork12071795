<?php

namespace App\Providers;

use App\Models\Post;
use App\Policies\PostPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * @var array
     */
    protected $policies = [
        Post::class => PostPolicy::class
    ];

    public function boot(): void
    {
        $this->registerPolicies();

        Passport::refreshTokensExpireIn(now()->addMonth());
        Passport::personalAccessTokensExpireIn(now()->addMonth());

        if (!$this->app->routesAreCached()) {
            Passport::routes();
        }
    }
}
