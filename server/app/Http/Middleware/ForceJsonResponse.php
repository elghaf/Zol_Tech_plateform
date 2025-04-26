<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ForceJsonResponse
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Force Accept header for all API routes
        $request->headers->set('Accept', 'application/json');
        
        // Get response
        $response = $next($request);
        
        // If it's an error response and not already JSON, convert it
        if ($response->getStatusCode() >= 400 && $response->headers->get('Content-Type') !== 'application/json') {
            return response()->json([
                'status' => false,
                'message' => $response->getContent() ?: 'Something went wrong',
            ], $response->getStatusCode());
        }
        
        return $response;
    }
} 