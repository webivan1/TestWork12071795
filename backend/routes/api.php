<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => ['auth:api']], function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('/post', \App\Http\Controllers\PostController::class);
});

Route::post('/login', [\App\Http\Controllers\LoginController::class, 'generateAccessToken']);
