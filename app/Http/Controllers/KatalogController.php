<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Katalog;
use Inertia\Inertia;


class KatalogController extends Controller
{
    public function index()
    {
        $katalogs = Katalog::latest()->paginate(10);
        return Inertia::render('Katalog/Index', ['katalogs' => $katalogs
    ]);
    }

    public function show(Katalog $katalog)
    {
        $katalog->load('author');
        return Inertia::render('Katalog/Show', ['katalog' => $katalog]);
    }

    public function create()
    {
        return Inertia::render('Katalog/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'nullable|string|max:255',
            'deskripsi' => 'nullable|string',
            'gambar' => 'nullable|image|max:2048',
        ]);

        // Handle file upload if exists
        if ($request->hasFile('gambar')) {
            $path = $request->file('gambar')->store('katalog', 'public');
            $validated['gambar'] = $path;
        }

        // Save to database (assuming a Katalog model exists)
        Katalog::create($validated);

        return redirect()->route('katalog.index')->with('success', 'Katalog berhasil ditambahkan.');
    }

    public function edit(Katalog $katalog)
{
    return Inertia::render('Katalog/Update', ['katalog' => $katalog]);
}

public function update(Request $request, Katalog $katalog)
{
    $validated = $request->validate([
        'nama' => 'nullable|string|max:255',
        'deskripsi' => 'nullable|string',
        'gambar' => 'nullable|image|max:2048',
    ]);

    // Handle file upload
    if ($request->hasFile('gambar')) {
        $path = $request->file('gambar')->store('katalog', 'public');
        $validated['gambar'] = $path;
    }

    // Update only filled fields
    $katalog->update(array_filter($validated, fn($value) => !is_null($value) && $value !== ''));

    return redirect()->route('katalog.index')->with('success', 'Katalog berhasil diperbarui.');
}

    public function destroy(Katalog $katalog)
    {
        $katalog->delete();
        return redirect()->route('katalog.index')->with('success', 'Katalog berhasil dihapus.');
    }
}
