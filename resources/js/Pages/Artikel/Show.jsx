import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Calendar, User, Tag, ArrowLeft, Edit, Trash2 } from 'lucide-react';

export default function Show({ artikel }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleDelete = () => {
        if (confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
            window.location.href = route('artikels.destroy', artikel.slug);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Detail Artikel</h2>
                    <div className="flex items-center space-x-2">
                        <Link
                            href={route('artikels.edit', artikel.slug)}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                        </Link>
                        <form method="POST" action={route('artikels.destroy', artikel.slug)} onSubmit={(e) => {
                            e.preventDefault();
                            if (confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
                                e.target.submit();
                            }
                        }} className="inline">
                            <input type="hidden" name="_method" value="DELETE" />
                            <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')} />
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 focus:bg-red-700 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150"
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Hapus
                            </button>
                        </form>
                    </div>
                </div>
            }
        >
            <Head title={artikel.title} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    {/* Back Button */}
                    <div className="mb-6">
                        <Link
                            href={route('artikels.index')}
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Kembali ke Daftar Artikel
                        </Link>
                    </div>

                    {/* Article Content */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* Article Header */}
                        <div className="p-6 bg-white border-b border-gray-200">
                            {/* Status Badge */}
                            <div className="mb-4">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                    artikel.status === 'published' 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                    {artikel.status === 'published' ? 'Dipublikasi' : 'Draft'}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                {artikel.title}
                            </h1>

                            {/* Meta Information */}
                            <div className="flex flex-wrap items-center text-sm text-gray-500 space-x-6 mb-6">
                                <div className="flex items-center">
                                    <User className="w-4 h-4 mr-2" />
                                    <span>
                                        {artikel.author ? artikel.author.name : 'Unknown Author'}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    <span>
                                        {artikel.published_at 
                                            ? formatDate(artikel.published_at)
                                            : formatDate(artikel.created_at)
                                        }
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <Tag className="w-4 h-4 mr-2" />
                                    <span>{artikel.category}</span>
                                </div>
                            </div>

                            {/* Excerpt */}
                            {artikel.excerpt && (
                                <div className="mb-6">
                                    <p className="text-lg text-gray-600 italic leading-relaxed">
                                        {artikel.excerpt}
                                    </p>
                                </div>
                            )}

                            {/* Thumbnail */}
                            {artikel.thumbnail && (
                                <div className="mb-6">
                                    <img
                                        src={`/storage/${artikel.thumbnail}`}
                                        alt={artikel.title}
                                        className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Article Body */}
                        <div className="p-6">
                            <div className="prose prose-lg max-w-none">
                                <div 
                                    className="text-gray-800 leading-relaxed"
                                    style={{ whiteSpace: 'pre-wrap' }}
                                >
                                    {artikel.content}
                                </div>
                            </div>
                        </div>

                        {/* Article Footer */}
                        {(artikel.meta_title || artikel.meta_description) && (
                            <div className="p-6 bg-gray-50 border-t border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Meta Information</h3>
                                {artikel.meta_title && (
                                    <div className="mb-2">
                                        <strong className="text-gray-700">Meta Title:</strong>
                                        <p className="text-gray-600">{artikel.meta_title}</p>
                                    </div>
                                )}
                                {artikel.meta_description && (
                                    <div>
                                        <strong className="text-gray-700">Meta Description:</strong>
                                        <p className="text-gray-600">{artikel.meta_description}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
