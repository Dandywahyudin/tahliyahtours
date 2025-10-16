<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Tahliyah') }}</title>

        <!-- Preload Critical Resources -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link rel="dns-prefetch" href="//fonts.bunny.net">
        <link rel="preload" href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" as="style">
        
        <!-- Fonts with display=swap for better performance -->
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

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
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
        
        <!-- Service Worker Registration for PWA -->
        <script>
            // Prevent browser extension interference
            window.addEventListener('error', function(e) {
                if (e.filename && e.filename.includes('contentScript.js')) {
                    e.preventDefault();
                    return false;
                }
            });

            if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js').catch(function(error) {
                        console.log('SW registration failed');
                    });
                });
            }
        </script>
    </body>
</html>
