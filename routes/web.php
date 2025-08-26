<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArtikelController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/artikels', [ArtikelController::class, 'index'])->name('artikels.index');
    Route::get('/artikels/create', [ArtikelController::class, 'create'])->name('artikels.create');
    Route::post('/artikels', [ArtikelController::class, 'store'])->name('artikels.store');
    Route::get('/artikels/{artikel}', [ArtikelController::class, 'show'])->name('artikels.show');
    Route::get('/artikels/{artikel}/edit', [ArtikelController::class, 'edit'])->name('artikels.edit');
    Route::put('/artikels/{artikel}', [ArtikelController::class, 'update'])->name('artikels.update');
    Route::delete('/artikels', [ArtikelController::class, 'destroy'])->name('artikels.destroy');

});

require __DIR__.'/auth.php';
