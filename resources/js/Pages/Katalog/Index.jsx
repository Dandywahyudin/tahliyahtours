import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ katalogs }) {
    
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Daftar Katalog</h2>}
        >
            <Head title="Katalog" />

            <div className="py-6 md:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-4 md:p-6 bg-white border-b border-gray-200">
                            <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                <h3 className="text-lg font-medium text-gray-900 mb-4 sm:mb-0">
                                    Total: {katalogs?.total || 0} katalog
                                </h3>
                                <Link
                                    href={route('katalog.create')}
                                    className="w-full sm:w-auto text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                                >
                                    + Tambah katalog
                                </Link>
                            </div>

                            {katalogs && katalogs.data && katalogs.data.length > 0 ? (
                                <>
                                    {/* Desktop Table View */}
                                    <div className="hidden lg:block overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Nama
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Deskripsi
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Gambar
                                                    </th>
                                                    <th className="relative px-6 py-3">
                                                        <span className="sr-only">Actions</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {katalogs.data.map((katalog) => (
                                                    <tr key={katalog.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            {katalog.nama}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {katalog.deskripsi}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {katalog.gambar && (
                                                                <img
                                                                    src={`/storage/${katalog.gambar}`}
                                                                    alt={katalog.nama}
                                                                    className="w-24 h-24 object-cover rounded-md"
                                                                />
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                            <Link
                                                                href={route('katalog.show', { katalog: katalog.id })}
                                                                className="text-blue-600 hover:text-blue-900"
                                                            >
                                                                Lihat
                                                            </Link>
                                                            <Link
                                                                href={route('katalog.edit', { katalog: katalog.id })}
                                                                className="text-indigo-600 hover:text-indigo-900"
                                                            >
                                                                Edit
                                                            </Link>
                                                            <Link
                                                                href={route('katalog.destroy', { katalog: katalog.id })}
                                                                method="delete"
                                                                as="button"
                                                                className="text-red-600 hover:text-red-900"
                                                                onClick={(e) => {
                                                                    if (!confirm('Apakah Anda yakin ingin menghapus katalog ini?')) {
                                                                        e.preventDefault();
                                                                    }
                                                                }}
                                                            >
                                                                Hapus
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Mobile Card View */}
                                    <div className="lg:hidden space-y-4">
                                        {katalogs.data.map((katalog) => (
                                            <div key={katalog.id} className="bg-white border rounded-lg p-4 shadow-sm">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 flex-1 mr-2">
                                                        {katalog.nama}
                                                    </h3>
                                                </div>
                                                <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                                                    {katalog.deskripsi}
                                                </p>
                                                {katalog.gambar && (
                                                    <img
                                                        src={`/storage/${katalog.gambar}`}
                                                        alt={katalog.nama}
                                                        className="w-full h-48 object-cover rounded-md mb-3"
                                                    />
                                                )}
                                                <div className="flex space-x-2">
                                                    <Link
                                                        href={route('katalog.show', { katalog: katalog.id })}
                                                        className="flex-1 text-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors duration-200"
                                                    >
                                                        Lihat
                                                    </Link>
                                                    <Link
                                                        href={route('katalog.edit', { katalog: katalog.id })}
                                                        className="flex-1 text-center px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors duration-200"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        href={route('katalog.destroy', { katalog: katalog.id })}
                                                        method="delete"
                                                        as="button"
                                                        className="flex-1 text-center px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors duration-200"
                                                        onClick={(e) => {
                                                            if (!confirm('Apakah Anda yakin ingin menghapus katalog ini?')) {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    >
                                                        Hapus
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-12">
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada katalog</h3>
                                    <p className="text-gray-500 mb-4">Mulai dengan membuat katalog pertama Anda.</p>
                                    <Link
                                        href={route('katalog.create')}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                                    >
                                        + Buat katalog Pertama
                                    </Link>
                                </div>
                            )}

                            {/* Pagination */}
                            {katalogs && katalogs.links && katalogs.links.length > 0 && (
                                <div className="mt-6 flex justify-center">
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                        {katalogs.links.map((link, index) => (
                                            <Link
                                                key={index}
                                                href={link.url || '#'}
                                                className={`relative inline-flex items-center px-2 py-2 text-sm font-medium border ${
                                                    link.active
                                                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                } ${!link.url ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-700'} ${
                                                    index === 0 ? 'rounded-l-md' : index === katalogs.links.length - 1 ? 'rounded-r-md' : ''
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </nav>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
