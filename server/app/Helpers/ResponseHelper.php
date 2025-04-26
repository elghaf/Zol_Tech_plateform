<?php

namespace App\Helpers;

use Illuminate\Http\JsonResponse;

class ResponseHelper
{
    public static function success($data = [], string $message = '', int $code = 200): JsonResponse
    {
        return response()->json([
            'status' => true,
            'message' => $message,
            'data' => $data
        ], $code);
    }

    public static function error(string $message = '', int $code = 400): JsonResponse
    {
        return response()->json([
            'status' => false,
            'message' => $message
        ], $code);
    }
} 