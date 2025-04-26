<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Illuminate\Http\Request;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });

        $this->renderable(function (Throwable $e, Request $request) {
            if ($request->is('api/*') || $request->expectsJson()) {
                if ($e instanceof ValidationException) {
                    return response()->json([
                        'status' => false,
                        'message' => 'Validation error',
                        'errors' => $e->errors()
                    ], 422);
                }

                if ($e instanceof AuthenticationException) {
                    return response()->json([
                        'status' => false,
                        'message' => 'Unauthenticated'
                    ], 401);
                }

                if ($e instanceof NotFoundHttpException) {
                    return response()->json([
                        'status' => false,
                        'message' => 'Resource not found'
                    ], 404);
                }

                // Handle other exceptions
                return response()->json([
                    'status' => false,
                    'message' => $e->getMessage() ?: 'Server Error'
                ], 500);
            }
        });
    }
} 