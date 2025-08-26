<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Artikel;
use Inertia\Controller;
use Illuminate\Http\Request;

class ArtikelController extends Controller
{
    public function index()
    {
        $artikel = Artikel::all();
        return Inertia::render('Artikel/Index');
    }

    public function create()
    {
        return Inertia::render('Artikel/Create');
    }

    public function edit($id)
    {
        return Inertia::render('Artikel/Edit', [
            'artikel' => Artikel::find($id),
        ]);
    }
}
