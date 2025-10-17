<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SecurityHeaders
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Security Headers
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('X-Frame-Options', 'SAMEORIGIN');
        $response->headers->set('X-XSS-Protection', '1; mode=block');
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
        $response->headers->set('Permissions-Policy', 'geolocation=(), microphone=(), camera=(), unload=*');
        
        // Content Security Policy - ALWAYS ACTIVE (untuk semua environment)
        // Ini memastikan Instagram & Google Maps bisa di-embed
        $csp = "default-src 'self'; " .
               "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.instagram.com https://connect.facebook.net https://fonts.bunny.net https: http: blob: data:; " .
               "script-src-elem 'self' 'unsafe-inline' https://www.instagram.com https://connect.facebook.net https://fonts.bunny.net https: http: blob: data:; " .
               "style-src 'self' 'unsafe-inline' https://fonts.bunny.net https: http: data:; " .
               "style-src-elem 'self' 'unsafe-inline' https://fonts.bunny.net https: http: data:; " .
               "font-src 'self' https://fonts.bunny.net https: http: data:; " .
               "img-src 'self' data: blob: https://www.instagram.com https://scontent.cdninstagram.com https: http:; " .
               "frame-src 'self' https://www.instagram.com https://www.google.com; " .
               "connect-src 'self' ws: wss: https://www.instagram.com https: http:; " .
               "media-src 'self' data: blob: https://www.instagram.com https: http:; " .
               "object-src 'none'; " .
               "base-uri 'self'; " .
               "form-action 'self';";
        
        $response->headers->set('Content-Security-Policy', $csp);

        return $response;
    }
}
