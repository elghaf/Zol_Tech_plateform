<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Services\AuthService;
use App\Helpers\ResponseHelper;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(protected AuthService $authService) {}

    public function register(RegisterRequest $request): JsonResponse
    {
        $user = $this->authService->register($request->validated());
        return ResponseHelper::success(['user' => $user], 'Registration successful');
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $tokenData = $this->authService->login($request->validated());
        return ResponseHelper::success($tokenData, 'Login successful');
    }
    
    public function logout(Request $request): JsonResponse
    {
        // Revoke the user's current token
        if ($request->user()) {
            $request->user()->currentAccessToken()->delete();
        }
        
        return ResponseHelper::success([], 'Logged out successfully');
    }
} 