<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Katalog extends Model
{
    use HasFactory;
    
    protected $table = 'katalog';
    protected $fillable = ['nama', 'deskripsi', 'gambar'];
    
    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    /** @use HasFactory<\Database\Factories\KatalogFactory> */

}
