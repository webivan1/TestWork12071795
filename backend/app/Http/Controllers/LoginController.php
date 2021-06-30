<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginFormRequest;
use App\Models\User;

class LoginController extends Controller
{
    public function generateAccessToken(LoginFormRequest $request)
    {
        try {
            $user = User::getUserByCredentials(
                $request->get('email'),
                $request->get('password')
            );

            return [
                'status' => 'success',
                'token' => $user->createToken('personal')->accessToken,
                'user' => $user->toArray()
            ];
        } catch (\DomainException $e) {
            return [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
    }
}
