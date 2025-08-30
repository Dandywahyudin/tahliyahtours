<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CompressionMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Enable gzip compression for text-based responses
        if ($this->shouldCompress($response)) {
            $content = $response->getContent();
            
            if (function_exists('gzencode') && strpos($request->header('Accept-Encoding'), 'gzip') !== false) {
                $compressed = gzencode($content, 9);
                $response->setContent($compressed);
                $response->headers->set('Content-Encoding', 'gzip');
                $response->headers->set('Content-Length', strlen($compressed));
            }
        }

        // Add cache headers for static assets
        if ($this->isStaticAsset($request)) {
            $response->headers->set('Cache-Control', 'public, max-age=31536000, immutable');
        }

        return $response;
    }

    private function shouldCompress(Response $response): bool
    {
        $contentType = $response->headers->get('Content-Type');
        
        return $contentType && (
            strpos($contentType, 'text/') === 0 ||
            strpos($contentType, 'application/json') === 0 ||
            strpos($contentType, 'application/javascript') === 0 ||
            strpos($contentType, 'text/css') === 0
        );
    }

    private function isStaticAsset(Request $request): bool
    {
        $path = $request->path();
        return preg_match('/\.(css|js|png|jpg|jpeg|gif|webp|svg|ico|woff|woff2|ttf)$/i', $path);
    }
}
