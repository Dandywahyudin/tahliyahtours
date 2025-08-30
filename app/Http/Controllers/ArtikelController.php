<?php

namespace App\Http\Controllers;

use App\Models\Artikel;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
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

    public function show(Artikel $artikel)
    {
        $artikel->load('author');
        return Inertia::render('Artikel/Show', ['artikel' => $artikel]);
    }

    public function edit(Artikel $artikel)
    {
        return Inertia::render('Artikel/Update', ['artikel' => $artikel]);
    }

    public function update(Request $request, Artikel $artikel)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'slug' => 'required|string|max:255|unique:artikels,slug,' . $artikel->id,
                'excerpt' => 'required|string|max:255',
                'content' => 'required|string',
                'category' => 'required|string|max:255',
                'thumbnail' => 'nullable|image|max:2048',
                'status' => 'required|in:draft,published',
                'published_at' => 'nullable|date',
                'meta_title' => 'nullable|string|max:255',
                'meta_description' => 'nullable|string|max:255',
            ]);

            // Update fields
            // Handle file upload
            if ($request->hasFile('thumbnail')) {
                // Delete old thumbnail if exists
                if ($artikel->thumbnail && Storage::disk('public')->exists($artikel->thumbnail)) {
                    Storage::disk('public')->delete($artikel->thumbnail);
                }
                $path = $request->file('thumbnail')->store('thumbnails', 'public');
                $validated['thumbnail'] = $path;
            } else {
                // Jika tidak upload file baru, jangan ubah thumbnail
                unset($validated['thumbnail']);
            }

            $artikel->fill($validated);

            // Convert published_at if status is published and no date set
            if ($validated['status'] === 'published' && empty($validated['published_at'])) {
                $artikel->published_at = now();
            }

            $artikel->save();

            return redirect()->route('artikels.index')->with('success', 'Artikel berhasil diperbarui.');

        } catch (\Illuminate\Validation\ValidationException $e) {
            return back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            Log::error('Error updating artikel: ' . $e->getMessage());
            return back()->withErrors(['message' => 'Terjadi kesalahan: ' . $e->getMessage()])->withInput();
        }
    }

    public function destroy(Artikel $artikel)
    {
        try {
            // Delete thumbnail if exists
            if ($artikel->thumbnail && Storage::disk('public')->exists($artikel->thumbnail)) {
                Storage::disk('public')->delete($artikel->thumbnail);
            }
            
            $artikel->delete();
            
            return redirect()->route('artikels.index')->with('success', 'Artikel berhasil dihapus.');
            
        } catch (\Exception $e) {
            Log::error('Error deleting artikel: ' . $e->getMessage());
            return back()->withErrors(['message' => 'Terjadi kesalahan saat menghapus artikel.']);
        }
    }
}