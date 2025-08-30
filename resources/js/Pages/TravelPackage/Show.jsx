import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Edit, Trash2, Calendar, Star, MapPin } from 'lucide-react';

export default function Show({ package: pkg }) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Detail Paket Travel</h2>
                    <div className="flex items-center space-x-2">
                        <Link
                            href={route('packages.edit', pkg.id)}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                        </Link>
                        <form method="POST" action={route('packages.destroy', pkg.id)} onSubmit={(e) => {
                            e.preventDefault();
                            if (confirm('Apakah Anda yakin ingin menghapus paket ini?')) {
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
            <Head title={pkg.title} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    {/* Back Button */}
                    <div className="mb-6">
                        <Link
                            href={route('packages.index')}
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Kembali ke Daftar Paket
                        </Link>
                    </div>

                    {/* Package Content */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* Package Header */}
                        <div className="p-6 bg-white border-b border-gray-200">
                            {/* Status Badge */}
                            <div className="mb-4">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                    pkg.status === 'published' 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                    {pkg.status === 'published' ? 'Dipublikasi' : 'Draft'}
                                </span>
                            </div>

                            {/* Package Image */}
                            {pkg.thumbnail && (
                                <div className="mb-6">
                                    <img
                                        src={`/storage/${pkg.thumbnail}`}
                                        alt={pkg.title}
                                        className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                                    />
                                </div>
                            )}

                            {/* Title */}
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                {pkg.title}
                            </h1>

                            {/* Package Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <div className="flex items-center mb-2">
                                        <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                                        <span className="font-semibold text-gray-700">Durasi</span>
                                    </div>
                                    <p className="text-2xl font-bold text-blue-600">{pkg.duration} Hari</p>
                                </div>

                                <div className="bg-green-50 p-4 rounded-lg">
                                    <div className="flex items-center mb-2">
                                        <span className="text-green-600 text-xl mr-2">💰</span>
                                        <span className="font-semibold text-gray-700">Harga</span>
                                    </div>
                                    <p className="text-2xl font-bold text-green-600">{formatPrice(pkg.price)}</p>
                                </div>

                                <div className="bg-yellow-50 p-4 rounded-lg">
                                    <div className="flex items-center mb-2">
                                        <Star className="w-5 h-5 text-yellow-600 mr-2" />
                                        <span className="font-semibold text-gray-700">Rating</span>
                                    </div>
                                    <p className="text-2xl font-bold text-yellow-600">{pkg.rating}/5</p>
                                </div>
                            </div>
                        </div>

                        {/* Package Description */}
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Deskripsi Paket</h2>
                            <div 
                                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                                style={{ whiteSpace: 'pre-wrap' }}
                            >
                                {pkg.description}
                            </div>
                        </div>

                        {/* Package Footer - Metadata */}
                        <div className="p-6 bg-gray-50 border-t border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Tambahan</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                                <div>
                                    <strong>Dibuat:</strong> {formatDate(pkg.created_at)}
                                </div>
                                <div>
                                    <strong>Diperbarui:</strong> {formatDate(pkg.updated_at)}
                                </div>
                                <div>
                                    <strong>ID Paket:</strong> #{pkg.id}
                                </div>
                                <div>
                                    <strong>Status:</strong> 
                                    <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                                        pkg.status === 'published' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {pkg.status === 'published' ? 'Dipublikasi' : 'Draft'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex justify-center space-x-4">
                        <Link
                            href={route('packages.edit', pkg.id)}
                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                            <Edit className="w-5 h-5 mr-2" />
                            Edit Paket
                        </Link>
                        
                        <Link
                            href={route('packages.index')}
                            className="inline-flex items-center px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-200"
                        >
                            Lihat Semua Paket
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
