<?php

namespace App\Http\Controllers;

use App\Models\TravelPackage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class TravelPackageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $packages = TravelPackage::latest()->paginate(10);
        return Inertia::render('TravelPackage/Index', ['packages' => $packages]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('TravelPackage/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'duration' => 'required|integer|min:1',
                'price' => 'required|numeric|min:0',
                'rating' => 'nullable|numeric|min:0|max:5',
                'thumbnail' => 'nullable|image|max:2048',
                'status' => 'required|in:draft,published',
            ]);

            // Handle file upload
            if ($request->hasFile('thumbnail')) {
                $path = $request->file('thumbnail')->store('packages', 'public');
                $validated['thumbnail'] = $path;
            }

            // Set default rating if not provided
            if (!isset($validated['rating'])) {
                $validated['rating'] = 0;
            }

            $package = TravelPackage::create($validated);

            return redirect()->route('packages.index')->with('success', 'Paket travel berhasil ditambahkan.');

        } catch (\Illuminate\Validation\ValidationException $e) {
            return back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            Log::error('Error creating travel package: ' . $e->getMessage());
            return back()->withErrors(['message' => 'Terjadi kesalahan: ' . $e->getMessage()])->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(TravelPackage $package)
    {
        return Inertia::render('TravelPackage/Show', ['package' => $package]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TravelPackage $package)
    {
        return Inertia::render('TravelPackage/Update', ['package' => $package]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TravelPackage $package)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'duration' => 'required|integer|min:1',
                'price' => 'required|numeric|min:0',
                'rating' => 'nullable|numeric|min:0|max:5',
                'thumbnail' => 'nullable|image|max:2048',
                'status' => 'required|in:draft,published',
            ]);

            // Handle file upload
            if ($request->hasFile('thumbnail')) {
                // Delete old thumbnail if exists
                if ($package->thumbnail && Storage::disk('public')->exists($package->thumbnail)) {
                    Storage::disk('public')->delete($package->thumbnail);
                }
                $path = $request->file('thumbnail')->store('packages', 'public');
                $validated['thumbnail'] = $path;
            } else {
                // Jika tidak upload file baru, jangan ubah thumbnail
                unset($validated['thumbnail']);
            }

            // Set default rating if not provided
            if (!isset($validated['rating'])) {
                $validated['rating'] = $package->rating ?? 0;
            }

            $package->fill($validated);
            $package->save();

            return redirect()->route('packages.index')->with('success', 'Paket travel berhasil diperbarui.');

        } catch (\Illuminate\Validation\ValidationException $e) {
            return back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            Log::error('Error updating travel package: ' . $e->getMessage());
            return back()->withErrors(['message' => 'Terjadi kesalahan: ' . $e->getMessage()])->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TravelPackage $package)
    {
        try {
            // Delete thumbnail if exists
            if ($package->thumbnail && Storage::disk('public')->exists($package->thumbnail)) {
                Storage::disk('public')->delete($package->thumbnail);
            }
            
            $package->delete();
            
            return redirect()->route('packages.index')->with('success', 'Paket travel berhasil dihapus.');
            
        } catch (\Exception $e) {
            Log::error('Error deleting travel package: ' . $e->getMessage());
            return back()->withErrors(['message' => 'Terjadi kesalahan saat menghapus paket travel.']);
        }
    }
}
