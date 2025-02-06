<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\AuthLoginRequest;
use App\Http\Requests\Auth\AuthRegisterRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;

class AuthController extends Controller
{
    public function register(AuthRegisterRequest $request): JsonResponse
    {
        $user = User::create($request->only(['name', 'email', 'password']));

        $token = $user->createToken($user->email);

        return response()->json([
            'data' => [
                'token' => $token->plainTextToken,
            ],
            'message' => 'Registro realizado com sucesso.',
        ], Response::HTTP_CREATED);
    }

    public function login(AuthLoginRequest $request): JsonResponse
    {
        $key = 'login-attempts:' . $request->ip();

        if (RateLimiter::tooManyAttempts($key, 5)) {
            return response()->json([
                'message' => 'Muitas tentativas de login. Por favor, tente novamente mais tarde.',
            ], Response::HTTP_TOO_MANY_REQUESTS);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            RateLimiter::hit($key, 60);

            return response()->json([
                'message' => 'As credenciais fornecidas estão incorretas.',
            ], Response::HTTP_UNAUTHORIZED);
        }

        RateLimiter::clear($key);

        $user->tokens()->delete();

        $token = $user->createToken($user->email);

        return response()->json([
            'data' => [
                'token' => $token->plainTextToken,
            ],
            'message' => 'Login realizado com sucesso.',
        ], Response::HTTP_OK);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'Logout realizado com sucesso.',
        ], Response::HTTP_OK);
    }

    public function self(Request $request): JsonResponse
    {
        return response()->json([
            'data' => [
                'user' => $request->user(),
            ],
        ], Response::HTTP_OK);
    }
}