<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MessageController;
use Illuminate\Support\Facades\Route;

// Add this new health check route
Route::get('/health', function() {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString()
    ]);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    
    Route::get('/messages', [MessageController::class, 'index']);
    Route::post('/messages', [MessageController::class, 'store']);
});
