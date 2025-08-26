import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ artikels }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Daftar Artikel</h2>}
        >
            <Head title="Artikel" />

            <div className="py-6 md:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-4 md:p-6 bg-white border-b border-gray-200">
                            <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                <h3 className="text-lg font-medium text-gray-900 mb-4 sm:mb-0">
                                    Total: {artikels?.total || 0} artikel
                                </h3>
                                <Link 
                                    href={route('artikels.create')} 
                                    className="w-full sm:w-auto text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                                >
                                    + Tambah Artikel
                                </Link>
                            </div>
                            
                            {artikels && artikels.data && artikels.data.length > 0 ? (
                                <>
                                    {/* Desktop Table View */}
                                    <div className="hidden lg:block overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Judul
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Kategori
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Status
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Author
                                                    </th>
                                                    <th scope="col" className="relative px-6 py-3">
                                                        <span className="sr-only">Actions</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {artikels.data.map((artikel) => (
                                                    <tr key={artikel.id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {artikel.title}
                                                            </div>
                                                            <div className="text-sm text-gray-500 line-clamp-2">
                                                                {artikel.excerpt}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {artikel.category || '-'}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                                artikel.status === 'published' 
                                                                ? 'bg-green-100 text-green-800' 
                                                                : 'bg-yellow-100 text-yellow-800'
                                                            }`}>
                                                                {artikel.status === 'published' ? 'Dipublikasi' : 'Draft'}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {artikel.author ? artikel.author.name : 'N/A'}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <div className="flex justify-end space-x-2">
                                                                <Link 
                                                                    href={route('artikels.edit', artikel.id)} 
                                                                    className="text-indigo-600 hover:text-indigo-900 font-medium"
                                                                >
                                                                    Edit
                                                                </Link>
                                                                <Link 
                                                                    href={route('artikels.destroy', artikel.id)} 
                                                                    method="delete"
                                                                    as="button"
                                                                    className="text-red-600 hover:text-red-900 font-medium"
                                                                    onClick={(e) => {
                                                                        if (!confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
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
                                        {artikels.data.map((artikel) => (
                                            <div key={artikel.id} className="bg-white border rounded-lg p-4 shadow-sm">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 flex-1 mr-2">
                                                        {artikel.title}
                                                    </h3>
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
                                                        artikel.status === 'published' 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                        {artikel.status === 'published' ? 'Dipublikasi' : 'Draft'}
                                                    </span>
                                                </div>
                                                
                                                <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                                                    {artikel.excerpt}
                                                </p>
                                                
                                                <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                                                    <span>Kategori: {artikel.category || '-'}</span>
                                                    <span>Author: {artikel.author ? artikel.author.name : 'N/A'}</span>
                                                </div>
                                                
                                                <div className="flex space-x-3">
                                                    <Link 
                                                        href={route('artikels.edit', artikel.id)} 
                                                        className="flex-1 text-center px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors duration-200"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Link 
                                                        href={route('artikels.destroy', artikel.id)} 
                                                        method="delete"
                                                        as="button"
                                                        className="flex-1 text-center px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors duration-200"
                                                        onClick={(e) => {
                                                            if (!confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
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
                                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada artikel</h3>
                                    <p className="text-gray-500 mb-4">Mulai dengan membuat artikel pertama Anda.</p>
                                    <Link 
                                        href={route('artikels.create')} 
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                                    >
                                        + Buat Artikel Pertama
                                    </Link>
                                </div>
                            )}
                            
                            {/* Pagination */}
                            {artikels && artikels.links && artikels.links.length > 3 && (
                                <div className="mt-6 flex justify-center">
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                        {artikels.links.map((link, index) => (
                                            <Link
                                                key={index}
                                                href={link.url || '#'}
                                                className={`relative inline-flex items-center px-2 py-2 text-sm font-medium border ${
                                                    link.active 
                                                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600' 
                                                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                } ${!link.url ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-700'} ${
                                                    index === 0 ? 'rounded-l-md' : index === artikels.links.length - 1 ? 'rounded-r-md' : ''
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