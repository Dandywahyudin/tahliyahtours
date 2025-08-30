import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Update({ artikel }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        title: artikel.title || '',
        slug: artikel.slug || '',
        excerpt: artikel.excerpt || '',
        content: artikel.content || '',
        category: artikel.category || '',
        thumbnail: null,
        status: artikel.status || 'draft',
        published_at: artikel.published_at ? artikel.published_at.split('T')[0] + 'T' + artikel.published_at.split('T')[1].split('.')[0] : '',
        meta_title: artikel.meta_title || '',
        meta_description: artikel.meta_description || '',
    });

    // Auto generate slug dari title
    function generateSlug(title) {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim('-');
    }

    function handleTitleChange(e) {
        const title = e.target.value;
        setData('title', title);
        
        // Auto generate slug jika slug kosong atau sama dengan slug dari title lama
        if (!data.slug || data.slug === generateSlug(artikel.title)) {
            setData('slug', generateSlug(title));
        }
    }

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

        post(route('artikels.update', artikel.slug), {
            data: formData,
            forceFormData: true,
        });
    }

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Artikel</h2>}
        >
            <Head title="Edit Artikel" />

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
                                
                                {/* Current Thumbnail Preview */}
                                {artikel.thumbnail && (
                                    <div className="mb-4">
                                        <label className="text-gray-700 text-sm font-bold mb-2">
                                            Thumbnail Saat Ini
                                        </label>
                                        <div className="mt-2">
                                            <img 
                                                src={`/storage/${artikel.thumbnail}`} 
                                                alt="Current thumbnail" 
                                                className="w-32 h-32 object-cover rounded-lg"
                                            />
                                        </div>
                                    </div>
                                )}
                                
                                {/* Title */}
                                <div className="mb-4">
                                    <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                        Judul
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={handleTitleChange}
                                    />
                                    {errors.title && <div className="text-red-500 text-xs italic">{errors.title}</div>}
                                </div>
                                
                                {/* Slug */}
                                <div className="mb-4">
                                    <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="slug">
                                        Slug
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="slug"
                                        type="text"
                                        value={data.slug}
                                        onChange={(e) => setData('slug', e.target.value)}
                                    />
                                    {errors.slug && <div className="text-red-500 text-xs italic">{errors.slug}</div>}
                                </div>
                                
                                {/* Excerpt */}
                                <div className="mb-4">
                                    <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="excerpt">
                                        Excerpt
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="excerpt"
                                        type="text"
                                        value={data.excerpt}
                                        onChange={(e) => setData('excerpt', e.target.value)}
                                    />
                                    {errors.excerpt && <div className="text-red-500 text-xs italic">{errors.excerpt}</div>}
                                </div>
                                
                                {/* Content */}
                                <div className="mb-4">
                                    <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                                        Konten
                                    </label>
                                    <textarea
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="content"
                                        rows="10"
                                        value={data.content}
                                        onChange={(e) => setData('content', e.target.value)}
                                    />
                                    {errors.content && <div className="text-red-500 text-xs italic">{errors.content}</div>}
                                </div>
                                
                                {/* Category */}
                                <div className="mb-4">
                                    <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                                        Kategori
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="category"
                                        type="text"
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                    />
                                    {errors.category && <div className="text-red-500 text-xs italic">{errors.category}</div>}
                                </div>
                                
                                {/* Thumbnail */}
                                <div className="mb-4">
                                    <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="thumbnail">
                                        Thumbnail Baru (Opsional)
                                    </label>
                                    <input
                                        id="thumbnail"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setData('thumbnail', e.target.files[0])}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    <small className="text-gray-500">Kosongkan jika tidak ingin mengganti thumbnail</small>
                                    {errors.thumbnail && <div className="text-red-500 text-xs italic">{errors.thumbnail}</div>}
                                </div>
                                
                                {/* Status */}
                                <div className="mb-4">
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
                                
                                {/* Published At */}
                                <div className="mb-4">
                                    <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="published_at">
                                        Tanggal Publish
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="published_at"
                                        type="datetime-local"
                                        value={data.published_at}
                                        onChange={(e) => setData('published_at', e.target.value)}
                                    />
                                    {errors.published_at && <div className="text-red-500 text-xs italic">{errors.published_at}</div>}
                                </div>
                                
                                {/* Meta Title */}
                                <div className="mb-4">
                                    <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="meta_title">
                                        Meta Title
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="meta_title"
                                        type="text"
                                        value={data.meta_title}
                                        onChange={(e) => setData('meta_title', e.target.value)}
                                    />
                                    {errors.meta_title && <div className="text-red-500 text-xs italic">{errors.meta_title}</div>}
                                </div>
                                
                                {/* Meta Description */}
                                <div className="mb-4">
                                    <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="meta_description">
                                        Meta Description
                                    </label>
                                    <textarea
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="meta_description"
                                        rows="3"
                                        value={data.meta_description}
                                        onChange={(e) => setData('meta_description', e.target.value)}
                                    />
                                    {errors.meta_description && <div className="text-red-500 text-xs italic">{errors.meta_description}</div>}
                                </div>
                                
                                <div className="flex items-center justify-between">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="submit"
                                        disabled={processing}
                                    >
                                        {processing ? 'Menyimpan...' : 'Update Artikel'}
                                    </button>
                                    
                                    <a
                                        href={route('artikels.index')}
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