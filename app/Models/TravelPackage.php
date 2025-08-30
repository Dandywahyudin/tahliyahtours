<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class TravelPackage extends Model
{
    /** @use HasFactory<\Database\Factories\TravelPackageFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'duration',
        'price',
        'rating',
        'thumbnail',
        'status',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'rating' => 'float',
    ];

    // Format harga ke Rupiah
    public function getFormattedPriceAttribute()
    {
        return 'Rp ' . number_format($this->price, 0, ',', '.');
    }

    // Scope untuk paket yang published
    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }
}
