import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        duration: '',
        price: '',
        rating: '',
        thumbnail: null,
        status: 'draft',
    });

    function submit(e) {
        e.preventDefault();
        
        // Create FormData untuk handle file upload
        const formData = new FormData();
        
        // Append semua field
        Object.keys(data).forEach(key => {
            if (data[key] !== null && data[key] !== '') {
                formData.append(key, data[key]);
            }
        });

        post(route('packages.store'), {
            data: formData,
            forceFormData: true,
            onSuccess: () => {
                // Reset form after success
                setData({
                    title: '',
                    description: '',
                    duration: '',
                    price: '',
                    rating: '',
                    thumbnail: null,
                    status: 'draft',
                });
            }
        });
    }

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Paket Travel Baru</h2>}
        >
            <Head title="Tambah Paket Travel" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={submit}>
                                {errors.message && (
                                    <div className="mb-4 text-red-600 bg-red-100 p-3 rounded">
                                        {errors.message}
                                    </div>
                                )}
                                
                                {/* Title */}
                                <div className="mb-4">
                                    <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                        Nama Paket
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Contoh: Umrah Premium"
                                    />
                                    {errors.title && <div className="text-red-500 text-xs italic">{errors.title}</div>}
                                </div>
                                
                                {/* Description */}
                                <div className="mb-4">
                                    <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                        Deskripsi
                                    </label>
                                    <textarea
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="description"
                                        rows="4"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Deskripsi paket travel..."
                                    />
                                    {errors.description && <div className="text-red-500 text-xs italic">{errors.description}</div>}
                                </div>
                                
                                {/* Duration */}
                                <div className="mb-4">
                                    <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="duration">
                                        Durasi (Hari)
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="duration"
                                        type="number"
                                        min="1"
                                        value={data.duration}
                                        onChange={(e) => setData('duration', e.target.value)}
                                        placeholder="12"
                                    />
                                    {errors.duration && <div className="text-red-500 text-xs italic">{errors.duration}</div>}
                                </div>
                                
                                {/* Price */}
                                <div className="mb-4">
                                    <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                                        Harga (Rp)
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="price"
                                        type="number"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        placeholder="25"
                                    />
                                </div>
                                
                                {/* Rating */}
                                <div className="mb-4">
                                    <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="rating">
                                        Rating (0-5)
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="rating"
                                        type="number"
                                        min="0"
                                        max="5"
                                        step="0.1"
                                        value={data.rating}
                                        onChange={(e) => setData('rating', e.target.value)}
                                        placeholder="4.8"
                                    />
                                    {errors.rating && <div className="text-red-500 text-xs italic">{errors.rating}</div>}
                                </div>
                                
                                {/* Thumbnail */}
                                <div className="mb-4">
                                    <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="thumbnail">
                                        Gambar Paket
                                    </label>
                                    <input
                                        id="thumbnail"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setData('thumbnail', e.target.files[0])}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    <small className="text-gray-500">Format: JPG, PNG, GIF. Maksimal 2MB</small>
                                    {errors.thumbnail && <div className="text-red-500 text-xs italic">{errors.thumbnail}</div>}
                                </div>
                                
                                {/* Status */}
                                <div className="mb-6">
                                    <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                                        Status
                                    </label>
                                    <select
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="status"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                    </select>
                                    {errors.status && <div className="text-red-500 text-xs italic">{errors.status}</div>}
                                </div>
                                
                                <div className="flex items-center justify-between">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="submit"
                                        disabled={processing}
                                    >
                                        {processing ? 'Menyimpan...' : 'Simpan Paket'}
                                    </button>
                                    
                                    <a
                                        href={route('packages.index')}
                                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Batal
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
