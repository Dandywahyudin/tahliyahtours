<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArtikelController;
use App\Http\Controllers\KatalogController;
use App\Http\Controllers\TravelPackageController;

use Inertia\Inertia;

Route::get('/', function () {
    // Ambil artikel published terbaru untuk ditampilkan di home
    $articles = \App\Models\Artikel::where('status', 'published')
        ->with('author')
        ->latest('published_at')
        ->limit(3)
        ->get();
    
    // Ambil paket travel published terbaru untuk ditampilkan di home
    $packages = \App\Models\TravelPackage::where('status', 'published')
        ->latest()
        ->limit(8)
        ->get();

    $katalogs = \App\Models\Katalog::with('author')
        ->latest()
        ->limit(10)
        ->get();
        
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'articles' => $articles,
        'packages' => $packages,
        'katalogs' => $katalogs,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Article routes
    Route::get('/artikels', [ArtikelController::class, 'index'])->name('artikels.index');
    Route::get('/artikels/create', [ArtikelController::class, 'create'])->name('artikels.create');
    Route::post('/artikels', [ArtikelController::class, 'store'])->name('artikels.store');
    Route::get('/artikels/{artikel}', [ArtikelController::class, 'show'])->name('artikels.show');
    Route::get('/artikels/{artikel}/update', [ArtikelController::class, 'edit'])->name('artikels.edit');
    Route::put('/artikels/{artikel}', [ArtikelController::class, 'update'])->name('artikels.update');
    Route::delete('/artikels/{artikel}', [ArtikelController::class, 'destroy'])->name('artikels.destroy');

    // Travel Package routes
    Route::get('/packages', [TravelPackageController::class, 'index'])->name('packages.index');
    Route::get('/packages/create', [TravelPackageController::class, 'create'])->name('packages.create');
    Route::post('/packages', [TravelPackageController::class, 'store'])->name('packages.store');
    Route::get('/packages/{package}', [TravelPackageController::class, 'show'])->name('packages.show');
    Route::get('/packages/{package}/edit', [TravelPackageController::class, 'edit'])->name('packages.edit');
    Route::put('/packages/{package}', [TravelPackageController::class, 'update'])->name('packages.update');
    Route::delete('/packages/{package}', [TravelPackageController::class, 'destroy'])->name('packages.destroy');

    Route::get('/katalog', [KatalogController::class, 'index'])->name('katalog.index');
    Route::get('/katalog/create', [KatalogController::class, 'create'])->name('katalog.create');
    Route::post('/katalog', [KatalogController::class, 'store'])->name('katalog.store');
    Route::get('/katalog/{katalog}/update', [KatalogController::class, 'edit'])->name('katalog.edit');
    Route::get('/katalog/{katalog}', [KatalogController::class, 'show'])->name('katalog.show');
    Route::put('/katalog/{katalog}', [KatalogController::class, 'update'])->name('katalog.update');
    Route::delete('/katalog/{katalog}', [KatalogController::class, 'destroy'])->name('katalog.destroy');

});

// Public article routes (tidak perlu auth)
Route::get('/artikel', function () {
    $articles = \App\Models\Artikel::where('status', 'published')
        ->with('author')
        ->latest('published_at')
        ->paginate(9);
        
    return Inertia::render('Public/Articles', [
        'articles' => $articles,
    ]);
})->name('public.articles');

Route::get('/artikel/{artikel}', function (\App\Models\Artikel $artikel) {
    // Only show published articles to public
    if ($artikel->status !== 'published') {
        abort(404);
    }
    
    $artikel->load('author');
    
    // Get other published articles (excluding current article)
    $otherArticles = \App\Models\Artikel::where('status', 'published')
        ->where('id', '!=', $artikel->id)
        ->with('author')
        ->latest('published_at')
        ->limit(5)
        ->get();
    
    return Inertia::render('Public/ArticleDetail', [
        'artikel' => $artikel,
        'otherArticles' => $otherArticles,
    ]);
})->name('public.article.show');

require __DIR__.'/auth.php';
