<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Tahliyah') }}</title>

        <!-- DNS Prefetch untuk faster third-party connections -->
        <link rel="dns-prefetch" href="https://fonts.bunny.net">
        <link rel="dns-prefetch" href="https://www.instagram.com">
        <link rel="dns-prefetch" href="https://www.google.com">
        
        <!-- Preconnect untuk critical resources -->
        <link rel="preconnect" href="https://www.instagram.com" crossorigin>
        <link rel="preconnect" href="https://fonts.bunny.net" crossorigin>        <!-- Preload Critical Font (inline subset untuk instant render) -->
        <style>
            /* Critical font subset untuk instant text rendering */
            @font-face {
                font-family: 'figtree-fallback';
                src: local('Arial'), local('Helvetica');
                size-adjust: 105%;
                ascent-override: 95%;
                descent-override: 25%;
                line-gap-override: 0%;
            }
            body { font-family: 'figtree-fallback', sans-serif; }
        </style>
        
        <!-- Load full fonts asynchronously -->
        <link rel="preload" href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
        <noscript><link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet"></noscript>

        <!-- SEO Meta Tags -->
        <meta name="description" content="TAHLIYAH Tours & Travel - Penyelenggara Perjalanan Ibadah Haji dan Umrah Terpercaya">
        <meta name="keywords" content="haji, umrah, tour, travel, ibadah, tahliyah">
        <meta name="author" content="TAHLIYAH Tours & Travel">
        
        <!-- Open Graph Meta Tags -->
        <meta property="og:title" content="{{ config('app.name', 'TAHLIYAH Tours & Travel') }}">
        <meta property="og:description" content="Penyelenggara Perjalanan Ibadah Haji dan Umrah Terpercaya">
        <meta property="og:type" content="website">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:image" content="{{ asset('images/logo.png') }}">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <meta property="og:image:alt" content="TAHLIYAH Tours & Travel Logo">
        <meta property="og:site_name" content="TAHLIYAH Tours & Travel">
        
        <!-- Twitter Card Meta Tags -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="{{ config('app.name', 'TAHLIYAH Tours & Travel') }}">
        <meta name="twitter:description" content="Penyelenggara Perjalanan Ibadah Haji dan Umrah Terpercaya">
        <meta name="twitter:image" content="{{ asset('images/logo.png') }}">
        <meta name="twitter:image:alt" content="TAHLIYAH Tours & Travel Logo">
        
        <!-- Favicon and Icons -->
        <link rel="icon" type="image/png" href="{{ asset('images/logo.png') }}" sizes="32x32">
        <link rel="icon" type="image/png" href="{{ asset('images/logo.png') }}" sizes="16x16">
        <link rel="shortcut icon" href="{{ asset('images/logo.png') }}" type="image/png">

        <!-- PWA Manifest -->
        <link rel="manifest" href="/manifest.json">
        <meta name="theme-color" content="#ea580c">
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="default">
        <meta name="apple-mobile-web-app-title" content="Tahliyah Tours">
        <link rel="apple-touch-icon" href="/favicon.ico">

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
        
        <!-- Inline Critical CSS untuk instant render -->
        <style>
            /* Critical above-the-fold styles */
            body{margin:0;padding:0;min-height:100vh;}
            *{box-sizing:border-box;}
            .font-sans{font-family:'figtree-fallback',sans-serif;}
            .antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}
        </style>
    </head>
    <body class="font-sans antialiased">
        @inertia
        
        <!-- Preload Critical Resources with High Priority -->
        <link rel="preload" as="image" href="{{ asset('images/logo.png') }}" fetchpriority="high">
        <link rel="preload" as="image" href="{{ asset('images/caraousel1.png') }}" fetchpriority="high">
        
        <!-- Service Worker Registration - Defer untuk tidak block rendering -->
        <script>
            // Performance optimization: Defer non-critical scripts
            window.addEventListener('load', function() {
                // Register Service Worker
                if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.register('/sw.js').catch(function(error) {
                        console.warn('SW registration failed:', error);
                    });
                }
                
                // Load Instagram SDK setelah page load (defer execution)
                if (document.querySelector('[class*="instagram"]') || document.querySelector('.blockquote-footer')) {
                    setTimeout(function() {
                        var script = document.createElement('script');
                        script.src = 'https://www.instagram.com/embed.js';
                        script.async = true;
                        script.defer = true;
                        document.body.appendChild(script);
                    }, 2000); // Delay 2 detik untuk prioritize critical rendering
                }
            });
            
            // Prevent browser extension errors from showing
            window.addEventListener('error', function(e) {
                if (e.filename && (e.filename.includes('contentScript.js') || e.filename.includes('extension'))) {
                    e.preventDefault();
                    return false;
                }
            }, true);
        </script>
    </body>
</html>
