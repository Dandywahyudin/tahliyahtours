<?php

namespace App\Http\Controllers;

use App\Models\Artikel;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
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
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'excerpt' => 'required|string|max:255',
                'content' => 'required|string',
                'category' => 'required|string|max:255',
                'thumbnail' => 'nullable|image|max:2048',
                'status' => 'required|in:draft,published',
                'published_at' => 'nullable|date',
                'meta_title' => 'nullable|string|max:255',
                'meta_description' => 'nullable|string|max:255',
            ]);

            // Set author_id to current authenticated user
            $validated['author_id'] = Auth::id();
            
            // Generate slug from title
            $validated['slug'] = Str::slug($validated['title']);

            // Handle file upload
            if ($request->hasFile('thumbnail')) {
                $path = $request->file('thumbnail')->store('thumbnails', 'public');
                $validated['thumbnail'] = $path;
            }

            // Convert published_at if status is published and no date set
            if ($validated['status'] === 'published' && empty($validated['published_at'])) {
                $validated['published_at'] = now();
            }

            $artikel = Artikel::create($validated);

            return redirect()->route('artikels.index')->with('success', 'Artikel berhasil ditambahkan.');

        } catch (\Illuminate\Validation\ValidationException $e) {
            return back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            Log::error('Error creating artikel: ' . $e->getMessage());
            return back()->withErrors(['message' => 'Terjadi kesalahan: ' . $e->getMessage()])->withInput();
        }
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

        return redirect()->route('artikels.index');
    }

    public function destroy(Artikel $artikel)
    {
        $artikel->delete();
        return redirect()->route('artikels.index');
    }
}