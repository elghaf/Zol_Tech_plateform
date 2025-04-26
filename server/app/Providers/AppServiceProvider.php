<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\ResponseFactory;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Force JSON responses for API requests
        $this->app->afterResolving(ResponseFactory::class, function ($factory) {
            $factory->macro('api', function ($data = null, $status = 200, array $headers = []) use ($factory) {
                return $factory->json([
                    'status' => $status < 400,
                    'message' => $data['message'] ?? '',
                    'data' => isset($data['data']) ? $data['data'] : $data,
                ], $status, $headers);
            });
        });

        $this->app->rebinding('request', function ($app, $request) {
            if ($request->is('api/*')) {
                $request->headers->set('Accept', 'application/json');
            }
        });
    }
}
