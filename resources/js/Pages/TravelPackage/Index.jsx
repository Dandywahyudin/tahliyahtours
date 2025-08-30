import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ packages }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Daftar Paket Travel</h2>}
        >
            <Head title="Paket Travel" />

            <div className="py-6 md:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-4 md:p-6 bg-white border-b border-gray-200">
                            <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                <h3 className="text-lg font-medium text-gray-900 mb-4 sm:mb-0">
                                    Total: {packages?.total || 0} paket
                                </h3>
                                <Link 
                                    href={route('packages.create')} 
                                    className="w-full sm:w-auto text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                                >
                                    + Tambah Paket
                                </Link>
                            </div>
                            
                            {packages && packages.data && packages.data.length > 0 ? (
                                <>
                                    {/* Desktop Table View */}
                                    <div className="hidden lg:block overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Paket
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Durasi
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Harga
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Rating
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Status
                                                    </th>
                                                    <th scope="col" className="relative px-6 py-3">
                                                        <span className="sr-only">Actions</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {packages.data.map((pkg) => (
                                                    <tr key={pkg.id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 h-12 w-12">
                                                                    {pkg.thumbnail ? (
                                                                        <img 
                                                                            className="h-12 w-12 rounded-lg object-cover" 
                                                                            src={`/storage/${pkg.thumbnail}`} 
                                                                            alt={pkg.title} 
                                                                        />
                                                                    ) : (
                                                                        <div className="h-12 w-12 rounded-lg bg-gray-300 flex items-center justify-center">
                                                                            <span className="text-gray-500 text-xs">No Image</span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-medium text-gray-900">
                                                                        {pkg.title}
                                                                    </div>
                                                                    <div className="text-sm text-gray-500 line-clamp-2">
                                                                        {pkg.description}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {pkg.duration} Hari
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            Rp {new Intl.NumberFormat('id-ID').format(pkg.price)}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            <div className="flex items-center">
                                                                <span className="text-yellow-400">★</span>
                                                                <span className="ml-1">{pkg.rating}/5</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                                pkg.status === 'published' 
                                                                ? 'bg-green-100 text-green-800' 
                                                                : 'bg-yellow-100 text-yellow-800'
                                                            }`}>
                                                                {pkg.status === 'published' ? 'Dipublikasi' : 'Draft'}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <div className="flex justify-end space-x-2">
                                                                <Link 
                                                                    href={route('packages.show', pkg.id)} 
                                                                    className="text-blue-600 hover:text-blue-900 font-medium"
                                                                >
                                                                    Lihat
                                                                </Link>
                                                                <Link 
                                                                    href={route('packages.edit', pkg.id)} 
                                                                    className="text-indigo-600 hover:text-indigo-900 font-medium"
                                                                >
                                                                    Edit
                                                                </Link>
                                                                <Link 
                                                                    href={route('packages.destroy', pkg.id)} 
                                                                    method="delete"
                                                                    as="button"
                                                                    className="text-red-600 hover:text-red-900 font-medium"
                                                                    onClick={(e) => {
                                                                        if (!confirm('Apakah Anda yakin ingin menghapus paket ini?')) {
                                                                            e.preventDefault();
                                                                        }
                                                                    }}
                                                                >
                                                                    Hapus
                                                                </Link>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Mobile Card View */}
                                    <div className="lg:hidden space-y-4">
                                        {packages.data.map((pkg) => (
                                            <div key={pkg.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                                                <div className="flex items-start space-x-4">
                                                    <div className="flex-shrink-0">
                                                        {pkg.thumbnail ? (
                                                            <img 
                                                                className="h-16 w-16 rounded-lg object-cover" 
                                                                src={`/storage/${pkg.thumbnail}`} 
                                                                alt={pkg.title} 
                                                            />
                                                        ) : (
                                                            <div className="h-16 w-16 rounded-lg bg-gray-300 flex items-center justify-center">
                                                                <span className="text-gray-500 text-xs">No Image</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="text-lg font-medium text-gray-900 mb-1">
                                                            {pkg.title}
                                                        </h3>
                                                        <div className="mb-2">
                                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                                pkg.status === 'published' 
                                                                ? 'bg-green-100 text-green-800' 
                                                                : 'bg-yellow-100 text-yellow-800'
                                                            }`}>
                                                                {pkg.status === 'published' ? 'Dipublikasi' : 'Draft'}
                                                            </span>
                                                        </div>
                                                        
                                                        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                                                            {pkg.description}
                                                        </p>
                                                        
                                                        <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                                                            <span>Durasi: {pkg.duration} Hari</span>
                                                            <span>Rating: ★{pkg.rating}/5</span>
                                                        </div>
                                                        
                                                        <div className="text-lg font-bold text-gray-900 mb-3">
                                                            Rp {new Intl.NumberFormat('id-ID').format(pkg.price)}
                                                        </div>
                                                        
                                                        <div className="flex space-x-2">
                                                            <Link 
                                                                href={route('packages.show', pkg.id)} 
                                                                className="flex-1 text-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors duration-200"
                                                            >
                                                                Lihat
                                                            </Link>
                                                            <Link 
                                                                href={route('packages.edit', pkg.id)} 
                                                                className="flex-1 text-center px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors duration-200"
                                                            >
                                                                Edit
                                                            </Link>
                                                            <Link 
                                                                href={route('packages.destroy', pkg.id)} 
                                                                method="delete"
                                                                as="button"
                                                                className="flex-1 text-center px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors duration-200"
                                                                onClick={(e) => {
                                                                    if (!confirm('Apakah Anda yakin ingin menghapus paket ini?')) {
                                                                        e.preventDefault();
                                                                    }
                                                                }}
                                                            >
                                                                Hapus
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    {packages.links && (
                                        <div className="mt-8 flex justify-center">
                                            <div className="flex items-center space-x-2">
                                                {packages.links.map((link, index) => (
                                                    link.url ? (
                                                        <Link
                                                            key={index}
                                                            href={link.url}
                                                            className={`px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
                                                                link.active
                                                                    ? 'bg-blue-500 text-white'
                                                                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                                            }`}
                                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                                        />
                                                    ) : (
                                                        <span
                                                            key={index}
                                                            className="px-3 py-2 text-sm rounded-md text-gray-400 cursor-not-allowed"
                                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                                        />
                                                    )
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-16">
                                    <div className="mx-auto w-24 h-24 text-gray-400 mb-6">
                                        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-semibold text-gray-600 mb-4">
                                        Belum Ada Paket Travel
                                    </h3>
                                    <p className="text-gray-500 mb-8 max-w-md mx-auto">
                                        Paket travel akan ditampilkan di sini setelah ditambahkan
                                    </p>
                                    <Link
                                        href={route('packages.create')}
                                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Tambah Paket Pertama
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
