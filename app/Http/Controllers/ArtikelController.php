<?php

namespace App\Http\Controllers;

use App\Models\Artikel;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ArtikelController extends Controller
{
    public function index()
    {
        $artikels = Artikel::with('author')->latest()->paginate(10);
        return Inertia::render('Artikel/Index', ['artikels' => $artikels]);
    }

    public function create()
    {
        return Inertia::render('Artikel/Create');
    }

    public function store(Request $request)
    {
        dd($request->all());
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:artikels,slug',
            'excerpt' => 'required|string|max:255',
            'content' => 'required|string',
            'category' => 'required|string|max:255',
            'thumbnail' => 'nullable|image|max:2048',
            'author_id' => 'required|exists:users,id',
            'status' => 'required|in:draft,published',
            'published_at' => 'nullable|date',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:255',
        ]);

        $artikel = new Artikel($request->all());
        $artikel->slug = Str::slug($request->title);
        $artikel->author_id = \Illuminate\Support\Facades\Auth::user()->id;

        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('thumbnails', 'public');
            $artikel->thumbnail = $path;
        }
        $artikel->save();

        return redirect()->route('artikel.index');
    }

    public function edit(Artikel $artikel)
    {
        return Inertia::render('Artikel/Edit', ['artikel' => $artikel]);
    }

    public function update(Request $request, Artikel $artikel)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'status' => 'required|in:draft,published',
            'thumbnail' => 'nullable|image|max:2048',
        ]);

        $artikel->fill($request->all());
        $artikel->slug = Str::slug($request->title);

        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('thumbnails', 'public');
            $artikel->thumbnail = $path;
        }

        $artikel->save();

        return redirect()->route('artikel.index');
    }

    public function destroy(Artikel $artikel)
    {
        $artikel->delete();
        return redirect()->route('artikel.index');
    }
}